import { Get, Route, Tags, Post, Delete } from 'tsoa';
import { Request, Response } from 'express';
import {
  deleteFileFromProject,
  getAllProjectDocuments,
  getDocumentById,
  registerFileToProject
} from '../repositories/project.repository';
import { addDocToStore } from '../../llm/services/vector.service';
import fs from 'fs';
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
      const doc = await registerFileToProject(req.params.projectId, req.file);
      await addDocToStore(req.params.projectId, doc);
      const context = await getAllProjectDocuments(req.params.projectId);
      res.status(201).send(context);
    } else {
      res.status(400).send({ message: 'No file attached' });
    }
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
