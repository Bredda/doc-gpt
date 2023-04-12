import dotenv from 'dotenv';
import { App } from './app.js';
import debug from 'debug';

dotenv.config();

const debugLog: debug.IDebugger = debug('*');
const PORT = Number(process.env.PORT) || 8000;
const server = new App();
server.start(PORT);
