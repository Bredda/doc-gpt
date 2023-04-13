import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error-handler.js';
import { AppDataSource } from './config/data-source.js';
import { CommonRoutesConfig } from './domain/routes/common.routes.config.js';
import { AuthRoutes } from './domain/routes/auth.routes.js';
import { ChatsRoutes } from './domain/routes/chats.routes.js';
import { DocumentsRoutes } from './domain/routes/documents.routes.js';
import { ProjectRoutes } from './domain/routes/projects.routes.js';
import winston from 'winston';
import expressWinston from 'express-winston';
import logger from './common/logger.js';
import http, { Server } from 'http';
import { Server as IoServer, Socket } from 'socket.io';
import LLMQuerier from './llm/index.js';
export class App {
  private server: Server;
  private socket!: IoServer;
  private app: Application;
  private routes: CommonRoutesConfig[] = [];
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.setupWebSocket();
    this.setupMiddlewares();
    this.setupSwagger();

    this.setupRoutes();
  }

  setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('tiny'));
    this.app.use(bodyParser.json());
    this.app.use(express.static('public'));
  }

  setupLogger(): void {
    const loggerOptions: expressWinston.LoggerOptions = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      )
    };

    if (!process.env.DEBUG) {
      loggerOptions.meta = false; // when not debugging, log requests as one-liners
    }
    this.app.use(expressWinston.logger(loggerOptions));
  }

  setupSwagger(): void {
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json'
        }
      })
    );
  }

  setupWebSocket(): void {
    const io = new IoServer(this.server, {
      cors: {
        origin: '*'
      }
    });
    io.on('connection', (socket: Socket) => {
      socket.on('conversation-query', (data: any) => {
        LLMQuerier.conversationQuery(data.chtId, data.query).then((resp) =>
          socket.emit('conversation-response', resp)
        );
      });
    });
  }

  setupErrorHandler(): void {
    this.app.use(errorHandler.handleError);
  }

  setupRoutes(): void {
    this.routes = [
      new ProjectRoutes(this.app),
      new ChatsRoutes(this.app),
      new AuthRoutes(this.app),
      new DocumentsRoutes(this.app)
    ];
  }

  public start(port: number): void {
    AppDataSource.initialize()
      .then(() => {
        this.server.listen(port, () => {
          logger.info(`Server is running on ${port}`);
        });
      })
      .catch((error) => {
        logger.info(`Unable to connect to db: ${error}`);
        process.exit(1);
      });
  }
}
