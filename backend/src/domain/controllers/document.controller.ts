import { Get, Route, Tags, Post, Delete } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import {
  deleteFileFromProject,
  getAllProjectDocuments,
  getDocumentById,
  registerFileToProject
} from '../repositories/document.repository';
import fs from 'fs';
import path from 'path';
import { ChromaService } from '../../llm/services/chroma.service';
import { config } from '../../config/index';
import { AppError, HttpCode } from '../../exceptions/exceptions';
@Route('projects')
@Tags('Documents')
class DocumentController {
  @Get('/projects/:projectId/documents')
  @Tags('')
  static getProjectContext = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      res.status(200).send(await getAllProjectDocuments(req.params.projectId));
    }
    runAsync().catch(next);
  };

  @Post('/projects/:projectId/documents')
  static uploadToContext = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      if (!req.file) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'No file attached to request'
        });
      }
      try {
        await ChromaService.addFileToCollection(req.params.projectId, req.file);
      } catch (error) {
        throw new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: 'Error while saving to vector store'
        });
      }
      try {
        await registerFileToProject(req.params.projectId, req.file);
      } catch (error) {
        throw new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: 'Error while saving file to project'
        });
      }

      res.status(201).send(await getAllProjectDocuments(req.params.projectId));
    }
    runAsync().catch(next);
  };

  @Get('/projects/:projectId/documents/:docId')
  static getDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      const options = {
        root: `${config.UPLOAD_PATH}/${req.params.projectId}`
      };

      const doc = await getDocumentById(req.params.docId);
      res.sendFile(path.basename(doc.path), options, function (err) {
        throw new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: 'Error while reading file'
        });
      });
    }
    runAsync().catch(next);
  };

  @Delete('/projects/:projectId/documents/:docId')
  static deleteDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    async function runAsync() {
      const doc = await getDocumentById(req.params.docId);
      if (doc) {
        fs.unlinkSync(doc.path);
        await deleteFileFromProject(req.params.projectId, req.params.docId);
      } else {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Error no document with id ${req.params.docId}`
        });
      }
      res.status(200).send(await getAllProjectDocuments(req.params.projectId));
    }
    runAsync().catch(next);
  };
}

export default DocumentController;
