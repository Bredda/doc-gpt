import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config.js';
import AuthController from '../controllers/auth.controller.js';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configure(): Application {
    this.app;
    this.app.route('/doc-gpt/signin').post(AuthController.signin);
    this.app.route('/doc-gpt/signup').post(AuthController.signup);
    return this.app;
  }
}
