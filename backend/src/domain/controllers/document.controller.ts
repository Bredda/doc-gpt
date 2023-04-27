import { Get, Route, Tags, Post, Delete } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import {
  deleteFileFromProject,
  getAllProjectDocuments,
  getDocumentById,
  registerFileToProject
} from '../repositories/project.repository';
import fs from 'fs';
import path from 'path';
import { ChromaService } from '../../llm/services/chroma.service';
import config from '../../config/config';
@Route('projects')
@Tags('Documents')
class DocumentController {
  @Get('/projects/:projectId/documents')
  @Tags('')
  static getProjectContext = async (req: Request, res: Response) => {
    const context = await getAllProjectDocuments(req.params.projectId);
    res.status(200).send(context);
  };

  @Post('/projects/:projectId/documents')
  static uploadToContext = async (req: Request, res: Response) => {
    if (req.file) {
      await registerFileToProject(req.params.projectId, req.file);
      await ChromaService.addFileToCollection(req.params.projectId, req.file);
      const context = await getAllProjectDocuments(req.params.projectId);
      res.status(201).send(context);
    } else {
      res.status(400).send({ message: 'No file attached' });
    }
  };

  @Get('/projects/:projectId/documents/:docId')
  static getDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const options = {
      root: `${config.UPLOAD_PATH}/${req.params.projectId}`
    };

    const doc = await getDocumentById(req.params.docId);
    res.sendFile(path.basename(doc.path), options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', doc.path);
      }
    });
  };

  @Delete('/projects/:projectId/documents/:docId')
  static deleteDocument = async (req: Request, res: Response) => {
    const doc = await getDocumentById(req.params.docId);
    if (doc) {
      fs.unlinkSync(doc.path);
      await deleteFileFromProject(req.params.projectId, req.params.docId);
    }
    const context = await getAllProjectDocuments(req.params.projectId);
    res.status(200).send(context);
  };
}

export default DocumentController;
