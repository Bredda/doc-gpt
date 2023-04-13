import { User, Project, OriginalDocument } from '../api/index.js';
import { AppDataSource } from '../../config/data-source.js';
import { DeleteResult } from 'typeorm';

export interface ICreateProjectPayload {
  name: string;
}

export const getProjectById = async (projectId: string): Promise<Project> => {
  return AppDataSource.manager.findOneByOrFail(Project, { id: projectId });
};

export const getProjectsByUserId = async (
  userId: string,
  withChats: boolean
): Promise<Array<Project>> => {
  let projects;
  if (withChats) {
    projects = await AppDataSource.manager.find(Project, {
      where: { userId: userId },
      relations: {
        chats: {
          settings: true
        }
      }
    });
  } else {
    projects = await AppDataSource.manager.findBy(Project, { userId: userId });
  }
  return projects;
};

export const deleteProjectById = async (
  projectId: string
): Promise<DeleteResult> => {
  return await AppDataSource.manager.delete(Project, { id: projectId });
};

export const registerFileToProject = async (
  projectId: string,
  doc: Partial<OriginalDocument>
): Promise<OriginalDocument> => {
  const project = await AppDataSource.manager.findOneByOrFail(Project, {
    id: projectId
  });
  return await AppDataSource.manager.save(OriginalDocument, {
    ...doc,
    project: project
  });
};

export const getAllProjectDocuments = async (
  projectId: string
): Promise<OriginalDocument[]> => {
  return await AppDataSource.manager.findBy(OriginalDocument, {
    project: { id: projectId }
  });
};

export const createNewProject = async (
  userId: string,
  payload: ICreateProjectPayload
): Promise<Project> => {
  const user = await AppDataSource.manager.findOneByOrFail(User, {
    id: userId
  });
  const projects = await AppDataSource.manager.find(Project, {
    where: { userId: user.id }
  });
  await AppDataSource.manager.save(Project, [
    ...projects,
    { name: payload.name, user: user }
  ]);
  return AppDataSource.manager.findOneOrFail(Project, {
    where: { name: payload.name }
  });
};