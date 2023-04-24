const axios = require('axios');

export const enableTracing = (): void => {
  process.env.LANGCHAIN_HANDLER = 'langchain';
};

export const createNewTracingSession = async (sessionName: string) => {
  await axios.post('http://localhost:4173/sessions', {
    tracerSessionName: sessionName
  });
};

export const switchToTracingSession = async (sessionName: string) => {
  process.env.LANGCHAIN_SESSION = sessionName;
};
