import { Language } from '../domain/api/enum';
import { addMessageToChat } from '../domain/repositories/chat.repository';
import { PromptService } from './services/prompts.service';
import { Chat } from '../domain/api/index';
import logger from '../common/logger';
import { getStore } from './services/vector.service';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { ModelService } from './services/mode.service';
import { TracingService } from './services/tracing.service';
import { ChainService } from './services/chain.service';
import { MemoryService } from './services/memory';
class LLMQuerier {
  static retrivalQAQuery = async (
    projectId: string,
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New Retrieval QA query for chat ${chatId}: ${query}`);
    TracingService.enableTracing();
    TracingService.switchToTracingSession(chatId);
    await addMessageToChat(chatId, query, 'user');
    const store = await getStore(projectId);

    const model = ModelService.getOpenAi();
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      store.asRetriever()
    );
    logger.debug(store.collectionName);
    logger.debug(store.numDimensions);
    const resp = await chain.call({ query, chatHistory: [] });
    const newChat = await addMessageToChat(chatId, resp.response, 'llm');
    return newChat;
  };

  static conversationQuery = async (
    chatId: string,
    query: string
  ): Promise<Chat> => {
    logger.debug(`New query for chat ${chatId}: ${query}`);
    TracingService.enableTracing();
    TracingService.switchToTracingSession(chatId);
    await addMessageToChat(chatId, query, 'user');

    const memory = await MemoryService.initMotorheadMemory(chatId);
    const model = ModelService.getOpenAi();

    const chatPrompt = PromptService.getConversationPrompt(
      Language.FRENCH,
      memory
    );
    const chain = ChainService.getConversationChain(model, chatPrompt, memory);
    const resp = await chain.call({ input: query });
    const newChat = await addMessageToChat(chatId, resp.response, 'llm');
    return newChat;
  };
}

export default LLMQuerier;
