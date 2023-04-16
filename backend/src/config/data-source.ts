import { DataSource } from 'typeorm';
import {
  Chat,
  ChatMessage,
  OriginalDocument,
  Project,
  User,
  ChatSettings
} from '../domain/api/index';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5431,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Project, ChatMessage, Chat, ChatSettings, OriginalDocument],
  subscribers: [],
  migrations: []
});
