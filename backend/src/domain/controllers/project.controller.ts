import { Get, Route, Tags, Post, Delete, Put } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import {
  createNewProject,
  deleteProjectById,
  getProjectById,
  getProjectsByUserId,
  renameProjectById
} from '../repositories/project.repository';
import { ChromaService } from '../../llm/services/chroma.service';
import { HttpCode } from '../../exceptions/exceptions';

@Route('projects')
@Tags('Project')
class ProjectController {
  @Get('/projects')
  static getUserProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      const userId = res.locals.jwtPayload.userId;
      const projects = await getProjectsByUserId(userId, true);
      res.send(projects);
    }
    runAsync().catch(next);
  };

  @Get('/projects/:projectId')
  static getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      res.send(await getProjectById(req.params.projectId));
    }
    runAsync().catch(next);
  };

  @Delete('/projects/:projectId')
  static deleteUserProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      await deleteProjectById(req.params.projectId);
      const projects = await getProjectsByUserId(
        res.locals.jwtPayload.userId,
        true
      );
      ChromaService.deleteCollection(req.params.projectId);
      res.send(projects);
    }
    runAsync().catch(next);
  };

  @Post('/projects')
  static createNewUserProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      const userId = res.locals.jwtPayload.userId;
      await createNewProject(userId, req.body);
      const projects = await getProjectsByUserId(
        res.locals.jwtPayload.userId,
        true
      );
      res.status(201).send(projects);
    }
    runAsync().catch(next);
  };

  @Put('/projects/:projectId')
  static renameProjectById=async(req:Request,res:Response,next:NextFunction)=>{
  async function runAsync() {
    const userId = res.locals.jwtPayload.userId;
    await renameProjectById(userId,req.params.projectId,req.body.name);
        const projects = await getProjectsByUserId(
          res.locals.jwtPayload.userId,
          true
        );
    res.status(HttpCode.OK).send(projects);
  }
  runAsync().catch(next);
  };
  
  }
  

export default ProjectController;
