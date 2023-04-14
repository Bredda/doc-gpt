import dotenv from 'dotenv';
import { App } from './app';
import debug from 'debug';

dotenv.config();

const debugLog: debug.IDebugger = debug('*');
const PORT = Number(process.env.PORT) || 3000;
const server = new App();
server.start(PORT);
