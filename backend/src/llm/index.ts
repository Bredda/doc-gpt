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
import {
  enableTracing,
  switchToTracingSession
} from './services/tracer-service';
import { getStore } from './services/vector.service';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
class LLMQuerier {
  static retrivalQAQuery = async (
    projectId: string,
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New Retrieval QA query for chat ${chatId}: ${query}`);
    enableTracing();
    switchToTracingSession(chatId);
    await addMessageToChat(chatId, query, 'user');
    const store = await getStore(projectId);
    const model = initOpenApi('gpt-3.5-turbo');
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      store.asRetriever()
    );
    logger.debug(store.collectionName);
    logger.debug(store.numDimensions);
    const resp = await chain.call({ query, chatHistory: [] });
    const newChat = await addMessageToChat(chatId, resp.response, 'llm');
    logger.debug(`LLM response: ${resp}`);
    return newChat;
  };

  static conversationQuery = async (
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New query for chat ${chatId}: ${query}`);
    enableTracing();
    switchToTracingSession(chatId);
    await addMessageToChat(chatId, query, 'user');
    const memory = await initMotorheadMemory(chatId);
    const model = initOpenApi('gpt-3.5-turbo');
    const chatPrompt = getConversationPrompt(Language.FRENCH, memory);
    const chain = new ConversationChain({
      memory,
      prompt: chatPrompt,
      llm: model
    });
    logger.debug(`Request send to llm`);
    const resp = await chain.call({ input: query });
    const newChat = await addMessageToChat(chatId, resp.response, 'llm');
    logger.debug(`LLM response: ${resp}`);
    return newChat;
  };
}

export default LLMQuerier;
