import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import { checkJwt } from '../../middlewares/checkJwt';
import ProjectController from '../controllers/project.controller';
import ChatController from '../controllers/chat.controller';

export class ChatsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ChatRoutes');
  }

  configure(): Application {
    this.app;
    this.app
      .route('/doc-gpt/projects/:projectId/chats')
      .get([checkJwt], ChatController.getProjectChats)
      .post([checkJwt], ChatController.createNewProjecthat);

    this.app
      .route('/doc-gpt/projects/:projectId/chats/:chatId')
      .get([checkJwt], ChatController.getSpecificChat)
      .delete([checkJwt], ChatController.deleteUserChat);

    return this.app;
  }
}
