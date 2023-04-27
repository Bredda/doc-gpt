import { Application } from 'express';
import express from 'express';
import cors from 'cors';
const helmet = require('helmet');
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error-handler';
import { AppDataSource } from './config/data-source';
import winston from 'winston';
import expressWinston from 'express-winston';
import logger from './common/logger';
import http, { Server } from 'http';
import { Server as IoServer, Socket } from 'socket.io';
import LLMQuerier from './llm/index';
import getRoutes from './domain/routes';
export class App {
  private server: Server;
  private app: Application;
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
        LLMQuerier.conversationQuery(data.chatId, data.query).then((resp) =>
          socket.emit('conversation-response', resp)
        );
      });
      socket.on('retrieval-query', (data: any) => {
        LLMQuerier.retrivalQAQuery(
          data.projectId,
          data.chatId,
          data.query
        ).then((resp) => socket.emit('retrieval-response', resp));
      });
    });
  }

  setupErrorHandler(): void {
    this.app.use(errorHandler.handleError);
  }

  setupRoutes(): void {
    getRoutes(this.app).forEach((r) =>
      logger.info(`Mounting route: ${r.getName()}`)
    );
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
