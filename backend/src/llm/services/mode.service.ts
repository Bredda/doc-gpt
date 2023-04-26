import logger from '../../common/logger';

const { OpenAI } = require('langchain/llms/openai');

export class ModelService {
  static getOpenAi = (modelName?: string, temperature?: number) => {
    logger.debug(`LLM model ${modelName} initialized`);
    return new OpenAI({
      temperature: temperature || 0,
      modelName: modelName || 'gpt-3.5-turbo',
      openAIApiKey: process.env.OPENAPI_KEY
    });
  };
}
