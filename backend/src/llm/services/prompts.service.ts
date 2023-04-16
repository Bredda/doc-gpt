const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate
} = require('langchain/prompts');
const { MotorheadMemory } = require('langchain/memory');
import { Language } from '../../domain/api/enum';
import { CONVERSATION_PROMPT, PROMPT_CONTEXT } from '../utils/prompts';

export const getConversationPrompt = (language: Language, memory: any) => {
  let context = memory.context ? PROMPT_CONTEXT[language] : '';

  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `${CONVERSATION_PROMPT[language]}${context}`
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ]);
};
