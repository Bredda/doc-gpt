import { Get, Route, Tags, Post, Put, Delete } from 'tsoa';
import { Request, Response } from 'express';
import {
  createNewProject,
  deleteProjectById,
  getAllProjectDocuments,
  getProjectById,
  getProjectsByUserId,
  registerFileToProject
} from '../repositories/project.repository';
import {
  createNewProjecthat,
  deleteChatById,
  getChat,
  getChatsByProjectId,
  updateChatSettings
} from '../repositories/chat.repository';
import { createNewTracingSession } from '../../llm/services/tracing.service';
@Route('projects')
@Tags('Chats')
class ChatController {
  @Delete('/projects/:projectId/chats/:chatId')
  static deleteUserChat = async (req: Request, res: Response) => {
    await deleteChatById(req.params.chatId);
    const projects = await getProjectsByUserId(
      res.locals.jwtPayload.userId,
      true
    );
    res.send(projects);
  };

  @Get('/projects/:projectId/chats')
  static getProjectChats = async (req: Request, res: Response) => {
    const projects = await getChatsByProjectId(req.params.projectId);
    res.send(projects);
  };

  @Get('/projects/:projectId/chats/:chatId')
  static getSpecificChat = async (req: Request, res: Response) => {
    const chat = await getChat(req.params.chatId);
    res.send(chat);
  };

  @Post('/projects/:projectId/chats')
  static createNewProjecthat = async (req: Request, res: Response) => {
    const chat = await createNewProjecthat(req.params.projectId, req.body);
    //await createNewTracingSession(chat.id);
    const projects = await getProjectsByUserId(
      res.locals.jwtPayload.userId,
      true
    );
    res.status(201).send(projects);
  };
}

export default ChatController;
