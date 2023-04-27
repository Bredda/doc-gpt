import { App } from './app';
import debug from 'debug';
import config from './config/config';

const debugLog: debug.IDebugger = debug('*');
const server = new App();
server.start(config.PORT);
