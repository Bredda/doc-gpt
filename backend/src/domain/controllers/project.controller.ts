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
import { createNewTracingSession } from '../../llm/services/tracer-service';

@Route('projects')
@Tags('Project')
class ProjectController {
  @Get('/projects')
  static getUserProjects = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const projects = await getProjectsByUserId(userId, true);
    res.send(projects);
  };

  @Get('/projects/:projectId')
  static getProjectById = async (req: Request, res: Response) => {
    const project = await getProjectById(req.params.projectId);
    console.log(project);
    res.send(project);
  };

  @Delete('/projects/:projectId')
  static deleteUserProject = async (req: Request, res: Response) => {
    await deleteProjectById(req.params.projectId);
    const projects = await getProjectsByUserId(
      res.locals.jwtPayload.userId,
      true
    );
    res.send(projects);
  };

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

  @Put('/projects/:projectId/chats/:chatId/settings')
  static updateChatSettings = async (req: Request, res: Response) => {
    await updateChatSettings(req.params.chatId, req.body);
    res.send('Settings updated');
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

  @Post('/projects')
  static createNewUserProject = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    await createNewProject(userId, req.body);
    const projects = await getProjectsByUserId(
      res.locals.jwtPayload.userId,
      true
    );
    res.status(201).send(projects);
  };

  @Get('/projects/:projectId/documents')
  @Tags('')
  static getProjectContext = async (req: Request, res: Response) => {
    const context = await getAllProjectDocuments(req.params.projectId);
    res.status(200).send(context);
  };

  @Post('/projects/:projectId/documents')
  static uploadToContext = async (req: Request, res: Response) => {
    console.log(req.file);
    if (req.file) {
      await registerFileToProject(req.params.projectId, req.file);
      const context = await getAllProjectDocuments(req.params.projectId);
      res.status(201).send(context);
    } else {
      res.status(400).send({ message: 'No file attached' });
    }
  };
}

export default ProjectController;
