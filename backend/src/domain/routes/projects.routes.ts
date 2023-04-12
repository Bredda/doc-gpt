import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config.js';
import { checkJwt } from '../../middlewares/checkJwt.js';
import ProjectController from '../controllers/project.controller.js';

export class ProjectRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ProjectRoutes');
  }

  configure(): Application {
    this.app;

    this.app
      .route('/doc-gpt/projects')
      .get([checkJwt], ProjectController.getUserProjects)
      .post([checkJwt], ProjectController.createNewUserProject);

    this.app
      .route('/doc-gpt/projects/:projectId')
      .get([checkJwt], ProjectController.getUserProjects)
      .delete([checkJwt], ProjectController.deleteUserProject);

    return this.app;
  }
}
