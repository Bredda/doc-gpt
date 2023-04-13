import { ConversationChain } from 'langchain/chains';
import { Language } from '../domain/api/enum.js';
import {
  getChat,
  addMessageToChat
} from '../domain/repositories/chat.repository.js';
import { initOpenApi } from './services/llm-models.js';
import { initMotorheadMemory } from './services/memory.js';
import { getConversationPrompt } from './services/prompts.service.js';

class LLMQuerier {
  static conversationQuery = async (chatId: string, query: string) => {
    const chat = await getChat(chatId);
    await addMessageToChat(chatId, query, 'user');
    const memory = await initMotorheadMemory(chatId);
    const model = initOpenApi('gpt-3.5-turbo');
    const chatPrompt = getConversationPrompt(Language.FRENCH, memory);
    const chain = new ConversationChain({
      memory,
      prompt: chatPrompt,
      llm: model
    });
    const resp = await chain.call({ input: query });
    await addMessageToChat(chatId, resp.response, 'llm');
    return resp;
  };
}

export default LLMQuerier;