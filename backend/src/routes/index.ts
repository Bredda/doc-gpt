import { NextFunction, Request, Response, Router } from 'express';
import auth from './auth.routes.js';
import llm from './llm.routes.js';
import project from './project.routes.js';
import { errorHandler } from '../middlewares/error-handler.js';
const routes = Router();

routes.use('/auth', auth);
routes.use('/', project);
routes.use('/llm', llm);

export default routes;
