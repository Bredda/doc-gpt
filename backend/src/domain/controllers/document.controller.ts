import { Get, Route, Tags, Post } from 'tsoa';
import { Request, Response } from 'express';
import {
  getAllProjectDocuments,
  registerFileToProject
} from '../repositories/project.repository';
import { addDocToStore } from '../../llm/services/vector.service';

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
    console.log(req.file);
    if (req.file) {
      const doc = await registerFileToProject(req.params.projectId, req.file);
      await addDocToStore(req.params.projectId, doc);
      const context = await getAllProjectDocuments(req.params.projectId);
      res.status(201).send(context);
    } else {
      res.status(400).send({ message: 'No file attached' });
    }
  };
}

export default DocumentController;
