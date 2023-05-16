import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import { checkJwt } from '../../middlewares/checkJwt';
import ProjectController from '../controllers/project.controller';

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
      .delete([checkJwt], ProjectController.deleteUserProject)
      .put([checkJwt], ProjectController.renameProjectById);

    return this.app;
  }
}
