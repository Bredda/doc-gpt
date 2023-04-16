const { ConversationChain } = require('langchain/chains');
import { Language } from '../domain/api/enum';
import {
  getChat,
  addMessageToChat
} from '../domain/repositories/chat.repository';
import { initOpenApi } from './services/llm-models';
import { initMotorheadMemory } from './services/memory';
import { getConversationPrompt } from './services/prompts.service';
import { Chat } from '../domain/api/index';
import logger from '../common/logger';

class LLMQuerier {
  static conversationQuery = async (
    chatId: string,
    query: string
  ): Promise<Chat> => {
    process.env.LANGCHAIN_HANDLER = 'langchain';
    const chat = await getChat(chatId);
    process.env.LANGCHAIN_SESSION = `${chatId}`;
    await addMessageToChat(chatId, query, 'user');
    const memory = await initMotorheadMemory(chatId);
    const model = initOpenApi('gpt-3.5-turbo');
    const chatPrompt = getConversationPrompt(Language.FRENCH, memory);
    const chain = new ConversationChain({
      memory,
      prompt: chatPrompt,
      llm: model
    });
    logger.info(chatPrompt.toString());
    const resp = await chain.call({ input: query });
    const newChat = await addMessageToChat(chatId, resp.response, 'llm');
    return newChat;
  };
}

export default LLMQuerier;
