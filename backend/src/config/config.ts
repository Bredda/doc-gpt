import dotenv from 'dotenv';

if (process.env.ENV !== 'PRODUCTION') {
  dotenv.config({ path: '../../.env' });
}

export default {
  PORT: Number(process.env.DOCGPT_BACK_PORT) || 3000,
  DB_PORT: Number(process.env.DOCGPT_DB_PORT) || 5432,
  DB_HOST: process.env.DOCGPT_DB_HOST || 'localhost',
  DB_NAME: process.env.DOCGPT_DB_NAME || 'postgres',
  DB_USER: process.env.DOCGPT_DB_USER || 'postgres',
  DB_PASSWORD: process.env.DOCGPT_DB_PASSWORD || 'postgres',
  JWT_SECRET: process.env.DOCGPT_SECRET || '@QEGTUI'
};
