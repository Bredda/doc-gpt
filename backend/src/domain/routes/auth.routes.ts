import { Application } from 'express';
import { CommonRoutesConfig } from './common.routes.config.js';
import AuthController from '../controllers/auth.controller.js';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configure(): Application {
    this.app;
    this.app.route('/doc-gpt/auth/signin').post(AuthController.signin);
    this.app.route('/doc-gpt/auth/signup').post(AuthController.signup);
    return this.app;
  }
}
