const { OpenAI } = require('langchain/llms/openai');

export const initOpenApi = (modelName: string) => {
  return new OpenAI({
    temperature: 0.9,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAPI_KEY
  });
};
