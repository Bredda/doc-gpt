import { Router } from 'express';
import auth from './auth.routes.js';
import llm from './llm.routes.js';
import project from './project.routes.js';
const routes = Router();

routes.use('/auth', auth);
routes.use('/', project);
routes.use('/llm', llm);

export default routes;
