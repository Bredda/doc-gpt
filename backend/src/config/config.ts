import dotenv from 'dotenv';
import logger from '../common/logger';

if (process.env.ENV !== 'PRODUCTION') {
  dotenv.config({ path: '../.env' });
}

const config = {
  PORT: Number(process.env.DOCGPT_BACK_PORT) || 3000,
  DB_PORT: Number(process.env.DOCGPT_DB_PORT) || 5432,
  DB_HOST: process.env.DOCGPT_DB_HOST || 'docgpt-db',
  DB_NAME: process.env.DOCGPT_DB_NAME || 'postgres',
  DB_USER: process.env.DOCGPT_DB_USER || 'postgres',
  DB_PASSWORD: process.env.DOCGPT_DB_PASSWORD || 'postgres',
  JWT_SECRET: process.env.DOCGPT_SECRET || '@QEGTUI',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CHROMA_PORT: process.env.CHROMA_SERVER_PORT || 8000,
  UPLOAD_PATH: process.env.DOCGPT_BACK_UPLOAD_PATH || './public/uploads',
  MOTORHEAD_HOST: process.env.MOTORHEAD_HOST || 'motorhead',
  MOTORHEAD_PORT: process.env.MOTORHEAD_PORT || 8081,
  CHROMA_HOST: process.env.CHROMA_HOST || 'chroma'
};

logger.debug('DB Settings');
logger.debug(`host: ${config.DB_HOST}`);
logger.debug(`port: ${config.DB_PORT}`);
logger.debug(`name: ${config.DB_NAME}`);
logger.debug(`user: ${config.DB_USER}`);
logger.debug(`password: ${config.DB_PASSWORD}`);
export default config;
