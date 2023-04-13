import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate
} from 'langchain/prompts';
import { MotorheadMemory } from 'langchain/memory';
import { Language } from '../../domain/api/enum.js';

export const getConversationPrompt = (
  language: Language,
  memory: MotorheadMemory
) => {
  const context = memory.context
    ? `
  Here's previous context: ${memory.context}`
    : '';
  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.${context}`
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ]);
};
