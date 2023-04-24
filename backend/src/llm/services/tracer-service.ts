import logger from '../../common/logger';

const axios = require('axios');

export const enableTracing = (): void => {
  process.env.LANGCHAIN_HANDLER = 'langchain';
  logger.debug('Langchain tracing enabled');
};

export const createNewTracingSession = async (sessionName: string) => {
  await axios.post('http://localhost:4173/sessions', {
    tracerSessionName: sessionName
  });
};

export const switchToTracingSession = (sessionName: string) => {
  process.env.LANGCHAIN_SESSION = sessionName;
  logger.debug(`Langchain tracing session set to ${sessionName}`);
};
