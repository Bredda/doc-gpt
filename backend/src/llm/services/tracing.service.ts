import logger from '../../common/logger';

const axios = require('axios');

export class TracingService {
  static enableTracing = (): void => {
    process.env.LANGCHAIN_HANDLER = 'langchain';
    logger.debug('Langchain tracing enabled');
  };
  static createNewTracingSession = async (sessionName: string) => {
    await axios.post('http://localhost:4173/sessions', {
      tracerSessionName: sessionName
    });
  };
  static switchToTracingSession = (sessionName: string) => {
    process.env.LANGCHAIN_SESSION = sessionName;
    logger.debug(`Langchain tracing session set to ${sessionName}`);
  };
}
