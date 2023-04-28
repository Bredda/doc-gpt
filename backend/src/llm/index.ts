import { Language } from '../domain/api/enum';
import {
  addMessageToChat,
  addMessageWithSourceToChat
} from '../domain/repositories/chat.repository';
import { PromptService } from './services/prompts.service';
import { Chat } from '../domain/api/index';
import logger from '../common/logger';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { ModelService } from './services/model.service';
import { TracingService } from './services/tracing.service';
import { ChainService } from './services/chain.service';
import { MemoryService } from './services/memory';
import { ChromaService } from './services/chroma.service';
import { QAChainResponse } from './api/qa-chain-response';
import { getDocumentById } from '../domain/repositories/project.repository';
import { DocumentService } from './services/document.service';
class LLMQuerier {
  static retrivalQAQuery = async (
    projectId: string,
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New Retrieval QA query for chat ${chatId}: ${query}`);
    TracingService.enableTracing();
    await addMessageToChat(chatId, query, 'user');

    const memory = await MemoryService.initMotorheadMemory(chatId);
    const chain = ChainService.getChatQAChain(
      ModelService.getOpenAi(),
      await ChromaService.getCollection(projectId)
    );
    const resp: QAChainResponse = (await chain.call({
      question: query,
      chat_history: memory
    })) as QAChainResponse;

    return await addMessageWithSourceToChat(projectId, chatId, resp);
  };

  static conversationQuery = async (
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New query for chat ${chatId}: ${query}`);
    TracingService.enableTracing();
    await addMessageToChat(chatId, query, 'user');

    const memory = await MemoryService.initMotorheadMemory(chatId);

    const chatPrompt = PromptService.getConversationPrompt(
      Language.FRENCH,
      memory
    );
    const chain = ChainService.getConversationChain(
      ModelService.getOpenAi(),
      chatPrompt,
      memory
    );
    const resp = await chain.call({ input: query });
    return await addMessageToChat(chatId, resp.response, 'llm');
  };

  static summarizationQuery = async (docIds: string[]) => {
    const chain = ChainService.getSummarizationChain(ModelService.getOpenAi());
    const docs: any[] = [];
    docIds.forEach(async (id) => {
      const originalDoc = await getDocumentById(id);
      docs.push(await DocumentService.createDocFromFilePath(originalDoc.path));
    });
    const resp = await chain.call({
      input_documents: docs
    });
    return resp;
  };
}

export default LLMQuerier;
