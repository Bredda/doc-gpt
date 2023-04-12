import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config.js';
import { checkJwt } from '../../middlewares/checkJwt.js';
import multer from 'multer';
import os from 'os';
import ProjectController from '../controllers/project.controller.js';

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
        ProjectController.uploadToContext
      )
      .get([checkJwt], ProjectController.getProjectContext);

    return this.app;
  }
}
