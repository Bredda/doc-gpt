import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import { checkJwt } from '../../middlewares/checkJwt';
import ProjectController from '../controllers/project.controller';

export class ChatsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ChatRoutes');
  }

  configure(): Application {
    this.app;
    this.app
      .route('/doc-gpt/projects/:projectId/chats')
      .get([checkJwt], ProjectController.getProjectChats)
      .post([checkJwt], ProjectController.createNewProjecthat);

    this.app
      .route('/doc-gpt/projects/:projectId/chats/:chatId')
      .get([checkJwt], ProjectController.getSpecificChat)
      .delete([checkJwt], ProjectController.deleteUserChat);

    return this.app;
  }
}
