import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import { checkJwt } from '../../middlewares/checkJwt';
import multer from 'multer';
import os from 'os';
import DocumentController from '../controllers/document.controller';

export class DocumentsRoutes extends CommonRoutesConfig {
  uploadPath!: multer.Multer;
  constructor(app: Application) {
    super(app, 'Documents routes');
  }

  configure(): Application {
    this.uploadPath = multer({ dest: os.tmpdir() });
    this.app
      .route('/doc-gpt/projects/:projectId/documents')
      .post(
        [checkJwt],
        this.uploadPath.single('file'),
        DocumentController.uploadToContext
      )
      .get([checkJwt], DocumentController.getProjectContext);
    this.app
      .route('/doc-gpt/projects/:projectId/documents/:docId')
      .delete([checkJwt], DocumentController.deleteDocument);

    return this.app;
  }
}
