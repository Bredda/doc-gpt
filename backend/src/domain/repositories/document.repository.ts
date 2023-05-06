import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../../config';
import { OriginalDocument } from '../api';
import { getProjectById } from './project.repository';

export const registerFileToProject = async (
  projectId: string,
  doc: Partial<OriginalDocument>
): Promise<OriginalDocument> => {
  const project = await getProjectById(projectId);
  return await AppDataSource.manager.save(OriginalDocument, {
    ...doc,
    project: project
  });
};

export const deleteFileFromProject = async (
  projectId: string,
  docId: string
): Promise<DeleteResult> => {
  return await AppDataSource.manager.delete(OriginalDocument, { id: docId });
};

export const getDocumentById = async (
  docId: string
): Promise<OriginalDocument> => {
  return await AppDataSource.manager.findOneByOrFail(OriginalDocument, {
    id: docId
  });
};

export const getAllProjectDocuments = async (
  projectId: string
): Promise<OriginalDocument[]> => {
  return await AppDataSource.manager.findBy(OriginalDocument, {
    project: { id: projectId }
  });
};
