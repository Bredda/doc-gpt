import { Application } from 'express';
import { ProjectRoutes } from './projects.routes';
import { ChatsRoutes } from './chats.routes';
import { AuthRoutes } from './auth.routes';
import { DocumentsRoutes } from './documents.routes';

const getRoutes = (app: Application) => {
  return [
    new ProjectRoutes(app),
    new ChatsRoutes(app),
    new AuthRoutes(app),
    new DocumentsRoutes(app)
  ];
};

export default getRoutes;
