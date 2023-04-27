import { DataSource } from 'typeorm';
import {
  Chat,
  ChatMessage,
  OriginalDocument,
  Project,
  User,
  ChatSettings
} from '../domain/api/index';
import { InitTables1681723146559 } from '../../migrations/1681723146559-InitTables';
import { InitDatas1681723156753 } from '../../migrations/1681723156753-InitDatas';
import config from './config';
import { SourceDocument } from '../domain/api/source-document';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Project,
    ChatMessage,
    Chat,
    ChatSettings,
    OriginalDocument,
    SourceDocument
  ],
  subscribers: [],
  //migrations: [InitTables1681723146559, InitDatas1681723156753],
  migrationsRun: true
});
