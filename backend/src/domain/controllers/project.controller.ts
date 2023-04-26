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

  @Put('/projects/:projectId/chats/:chatId/settings')
  static updateChatSettings = async (req: Request, res: Response) => {
    await updateChatSettings(req.params.chatId, req.body);
    res.send('Settings updated');
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
}

export default ProjectController;
