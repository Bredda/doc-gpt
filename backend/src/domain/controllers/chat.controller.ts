import { Get, Route, Tags, Post, Delete, Put } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import { getProjectsByUserId } from '../repositories/project.repository';
import {
  createNewProjecthat,
  deleteChatById,
  getChat,
  getChatsByProjectId,
  updateChatSettings
} from '../repositories/chat.repository';
@Route('projects')
@Tags('Chats')
class ChatController {
  /**
   * Delete a chat by its id and returns the updated list of user projects
   * @param req
   * @param res
   * @param next
   */
  @Delete('/projects/:projectId/chats/:chatId')
  static deleteUserChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      await deleteChatById(req.params.chatId);
      const projects = await getProjectsByUserId(
        res.locals.jwtPayload.userId,
        true
      );
      res.send(projects);
    }
    runAsync().catch(next);
  };

  @Get('/projects/:projectId/chats')
  static getProjectChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      res.send(getChatsByProjectId(req.params.projectId));
    }
    runAsync().catch(next);
  };

  @Get('/projects/:projectId/chats/:chatId')
  static getSpecificChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      res.send(await getChat(req.params.chatId));
    }
    runAsync().catch(next);
  };

  @Post('/projects/:projectId/chats')
  static createNewProjecthat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      await createNewProjecthat(req.params.projectId, req.body);
      //await createNewTracingSession(chat.id);
      const projects = await getProjectsByUserId(
        res.locals.jwtPayload.userId,
        true
      );
      res.status(201).send(projects);
    }
    runAsync().catch(next);
  };

  @Put('/projects/:projectId/chats/:chatId/settings')
  static updateChatSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      await updateChatSettings(req.params.chatId, req.body);
      res.send('Settings updated');
    }
    runAsync().catch(next);
  };
}

export default ChatController;
