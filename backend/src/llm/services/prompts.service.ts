const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate
} = require('langchain/prompts');
const { MotorheadMemory } = require('langchain/memory');
import { Language } from '../../domain/api/enum';

export const getConversationPrompt = (language: Language, memory: any) => {
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
