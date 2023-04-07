import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/data-source.js';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import { AppError } from './exceptions/exceptions.js';
import { errorHandler } from './middlewares/error-handler.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
);

app.use('/doc-gpt', routes);

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, req, res, next);
  }
);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((error) => {
    console.log('Unable to connect to db', error);
    process.exit(1);
  });
