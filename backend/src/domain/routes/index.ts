import { Application } from 'express';
import { ProjectRoutes } from './projects.routes.js';
import { ChatsRoutes } from './chats.routes.js';
import { AuthRoutes } from './auth.routes.js';
import { DocumentsRoutes } from './documents.routes.js';

const getRoutes = (app: Application) => {
  return [
    new ProjectRoutes(app),
    new ChatsRoutes(app),
    new AuthRoutes(app),
    new DocumentsRoutes(app)
  ];
};

export default getRoutes;
