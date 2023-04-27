import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import { checkJwt } from '../../middlewares/checkJwt';
import multer from 'multer';
import DocumentController from '../controllers/document.controller';
import fs from 'fs';
import config from '../../config/config';
export class DocumentsRoutes extends CommonRoutesConfig {
  uploadPath!: multer.Multer;

  upload!: multer.Multer;

  constructor(app: Application) {
    super(app, 'Documents routes');
  }

  configure(): Application {
    this.upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const directory = `${config.UPLOAD_PATH}/${req.params.projectId}`;

          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }

          cb(null, directory);
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      })
    });

    this.app
      .route('/doc-gpt/projects/:projectId/documents')
      .post(
        [checkJwt],
        this.upload.single('file'),
        DocumentController.uploadToContext
      )
      .get([checkJwt], DocumentController.getProjectContext);
    this.app
      .route('/doc-gpt/projects/:projectId/documents/:docId')
      .delete([checkJwt], DocumentController.deleteDocument);

    return this.app;
  }
}
