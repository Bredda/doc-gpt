const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate
} = require('langchain/prompts');
const { MotorheadMemory } = require('langchain/memory');
import logger from '../../common/logger';
import { Language } from '../../domain/api/enum';
import { CONVERSATION_PROMPT, PROMPT_CONTEXT } from '../utils/prompts';

export class PromptService {
  static getConversationPrompt = (language: Language, memory: any) => {
    logger.debug(`Construct conversational prompt in ${language.toString()}}`);

    let context = memory.context ? PROMPT_CONTEXT[language] : '';

    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `${CONVERSATION_PROMPT[language]}${context}`
      ),
      new MessagesPlaceholder('history'),
      HumanMessagePromptTemplate.fromTemplate('{input}')
    ]);

    return prompt;
  };
}
