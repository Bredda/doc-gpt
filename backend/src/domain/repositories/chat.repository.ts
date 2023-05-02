import { AppDataSource } from '../../config/data-source';
import { DeleteResult } from 'typeorm';
import {
  Chat,
  ChatMessage,
  ChatSettings,
  OriginalDocument,
  Project
} from '../api/index';
import { Language, LlmModel } from '../api/enum';
import { ChatType } from '../api/enum';
import { SourceDocument } from '../api/source-document';
import { getDocumentsById } from './project.repository';

export interface ICreateChatPayload {
  name: string;
  settings: {
    language: string;
    model: string;
    type: string;
  };
  docIds?: string[];
}

export interface IUpdateChatPayload {
  name?: string;
  settings?: ChatSettings;
}

export const getChatsByProjectId = async (
  projectId: string
): Promise<Array<Chat>> => {
  return await AppDataSource.manager.find(Chat, {
    where: {
      project: {
        id: projectId
      }
    },
    relations: {
      settings: true,
      documents: true
    },
    order: {
      createdAt: 'ASC'
    }
  });
};

export const updateChatSettings = async (
  chatId: string,
  payload: IUpdateChatPayload
): Promise<any> => {
  const chat = await AppDataSource.manager.findOneOrFail(Chat, {
    where: { id: chatId },
    relations: { settings: true }
  });
  if (chat.settings && payload.settings) {
    await AppDataSource.createQueryBuilder()
      .update(ChatSettings)
      .set({
        language: payload.settings.language,
        model: payload.settings.model
      })
      .where('id = :id', { id: chat.settings.id })
      .execute();
  }
  if (payload.name) {
    await AppDataSource.createQueryBuilder()
      .update(Chat)
      .set({ name: payload.name })
      .where('id = :id', { id: chat.id })
      .execute();
  }
};

export const addMessageToChat = async (
  chatId: string,
  query: string,
  origin: string
): Promise<Chat> => {
  const chat: Chat = await AppDataSource.manager.findOneByOrFail(Chat, {
    id: chatId
  });
  await AppDataSource.manager.save(ChatMessage, {
    content: query,
    origin: origin,
    chat: chat
  });

  return await AppDataSource.manager.findOneOrFail(Chat, {
    where: { id: chatId },
    relations: { messages: true, settings: true },
    order: {
      messages: {
        createdAt: 'ASC'
      }
    }
  });
};

export const addMessageWithSourceToChat = async (
  projectId: string,
  chatId: string,
  message: any
): Promise<Chat> => {
  const chat: Chat = await AppDataSource.manager.findOneByOrFail(Chat, {
    id: chatId
  });
  // Persist new message linked to chat
  const newMess = await AppDataSource.manager.save(ChatMessage, {
    content: message.text,
    sources: [],
    origin: 'llm',
    chat: chat
  });
  //Persist all source docs linked to this message
  message.sourceDocuments.forEach(async (sd: any) => {
    const originalDoc = await AppDataSource.manager.findOneOrFail(
      OriginalDocument,
      {
        where: {
          project: {
            id: projectId
          },
          path: sd.metadata.source
        }
      }
    );

    await AppDataSource.manager.save(SourceDocument, {
      pageContent: sd.pageContent,
      source: sd.metadata.source,
      to: sd.metadata.loc.lines.to,
      from: sd.metadata.loc.lines.from,
      originalDocId: originalDoc.id,
      message: newMess
    });
  });
  // Return the chat updated with new message and source docs
  return await AppDataSource.manager.findOneOrFail(Chat, {
    where: { id: chatId },
    relations: { messages: true, settings: true },
    order: {
      messages: {
        createdAt: 'ASC'
      }
    }
  });
};

export const getChat = async (chatId: string): Promise<Chat> => {
  return AppDataSource.manager.findOneOrFail(Chat, {
    where: { id: chatId },
    relations: { messages: true, settings: true },
    order: {
      messages: {
        createdAt: 'ASC'
      }
    }
  });
};

export const deleteChatById = async (chatId: string): Promise<DeleteResult> => {
  return await AppDataSource.manager.delete(Chat, { id: chatId });
};

export const createNewProjecthat = async (
  projectId: string,
  payload: ICreateChatPayload
): Promise<Chat> => {
  const project = await AppDataSource.manager.findOneByOrFail(Project, {
    id: projectId
  });
  const newSettings = await AppDataSource.manager.save(ChatSettings, {
    language: payload.settings.language as Language,
    model: payload.settings.model as LlmModel,
    type: payload.settings.type as ChatType
  });
  const docs = payload.docIds ? await getDocumentsById(payload.docIds) : [];
  const newChat = {
    name: payload.name,
    project: project,
    settings: newSettings,
    documents: docs
  };
  await AppDataSource.manager.save(Chat, newChat);
  return AppDataSource.manager.findOneOrFail(Chat, {
    where: { name: payload.name, project: { id: project.id } }
  });
};
