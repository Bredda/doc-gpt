import { DataSource } from 'typeorm';
import { User } from '../models/user.js';
import { Project } from '../models/project.js';
import { ChatMessage } from '../models/chat-message.js';
import { Chat } from '../models/chat.js';
import { ChatSettings } from '../models/chat-settings.js';
import { OriginalDocument } from '../models/document.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Project, ChatMessage, Chat, ChatSettings, OriginalDocument],
  subscribers: [],
  migrations: []
});
