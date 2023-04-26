import logger from '../../common/logger';
import config from '../../config/config';

const { OpenAI } = require('langchain/llms/openai');

export class ModelService {
  static getOpenAi = (modelName?: string, temperature?: number) => {
    const model = modelName || 'gpt-3.5-turbo';
    const temp = temperature || 0;
    logger.debug(`Init LLM model ${model} with temperature ${temp}`);
    return new OpenAI({
      temperature: temp,
      modelName: model,
      openAIApiKey: config.OPENAI_API_KEY
    });
  };
}
