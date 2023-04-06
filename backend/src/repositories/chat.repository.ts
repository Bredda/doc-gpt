import { User } from "../models/user.js";
import { AppDataSource } from "../config/data-source.js";
import { Project } from "../models/project.js";
import { ChatSettings } from "../models/chat-settings.js";
import { Chat } from "../models/chat.js";
import { Language, LlmModel } from "../models/enum.js";
import { DeleteResult } from "typeorm";
import { ChatMessage } from "../models/chat-message.js";

export interface ICreateChatPayload{
    name: string
    settings: ChatSettings
}

export interface ICreateChatPayload{
    name: string
    settings: ChatSettings
}

export interface IUpdateChatPayload{
    name?: string
    settings?: ChatSettings
}



export const getChatsByProjectId = async (projectId: number): Promise<Array<Chat>> => {
    return await AppDataSource.manager.find(Chat, { where: {
        project: {
            id: projectId
        }
    },relations: {
        settings: true,
    }
    })
}

export const updateChatSettings = async (chatId: number, payload: IUpdateChatPayload): Promise<any> => {
    const chat = await AppDataSource.manager.findOneOrFail(Chat, {where: {id: chatId}, relations: {settings: true}})
    if (chat.settings && payload.settings) {
        await AppDataSource
        .createQueryBuilder()
        .update(ChatSettings)
        .set({language: payload.settings.language, model: payload.settings.model})
        .where("id = :id", { id: chat.settings.id })
        .execute()
    }
    if (payload.name) {
        await AppDataSource
        .createQueryBuilder()
        .update(Chat)
        .set({name: payload.name})
        .where("id = :id", { id: chat.id })
        .execute()
    }

}

export const addMessageToChat = async (chatId: number, query: string, origin: string): Promise<Chat> => {
    const OldChat: Chat = await AppDataSource.manager.findOneByOrFail(Chat, {id: chatId})
    const message: ChatMessage = await AppDataSource.manager.save(ChatMessage, {content: query, origin: origin, chat: OldChat})
    if (!OldChat.messages) 
        OldChat.messages = [message]
    else 
        OldChat.messages = [...OldChat.messages, message]
    return await AppDataSource.manager.findOneOrFail(Chat, {where: {id: chatId}, relations: {messages: true}})
}

export const getChat = async (chatId: number): Promise<Chat> => {
    return AppDataSource.manager.findOneOrFail(Chat, 
        {where: {id: chatId}, relations: {messages: true}}
    )
}



export const deleteChatById = async (chatId: number): Promise<DeleteResult> => {
    return await AppDataSource.manager.delete(Chat, {id: chatId})
}

export const createNewProjecthat = async (projectId: number, payload: ICreateChatPayload): Promise<Chat> => {
    const chats =  await getChatsByProjectId(projectId)
    const project = await AppDataSource.manager.findOneByOrFail(Project, {id: projectId})
    let newChat = {...payload, project: project}
    if (!newChat.settings) {
        const defaultSettings = new ChatSettings()
        defaultSettings.language = Language.FRENCH.toString()
        defaultSettings.model = LlmModel.GPT3_5_TURBO.toString()
        const newSettings = await AppDataSource.manager.save(ChatSettings, defaultSettings)
        newChat = {...newChat, settings: newSettings}
    }
    await AppDataSource.manager.save(Chat, [... chats, newChat])
    return AppDataSource.manager.findOneOrFail(Chat, {where: {name: payload.name}})
}