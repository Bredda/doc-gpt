import { Language } from '../domain/api/enum';
import { addMessageToChat } from '../domain/repositories/chat.repository';
import { PromptService } from './services/prompts.service';
import { Chat } from '../domain/api/index';
import logger from '../common/logger';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { ModelService } from './services/model.service';
import { TracingService } from './services/tracing.service';
import { ChainService } from './services/chain.service';
import { MemoryService } from './services/memory';
import { ChromaService } from './services/chroma.service';
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

    const store = await ChromaService.getCollection(projectId);
    const memory = await MemoryService.initMotorheadMemory(chatId);
    const chain = ConversationalRetrievalQAChain.fromLLM(
      ModelService.getOpenAi(),
      store.asRetriever()
    );
    const resp = await chain.call({ question: query, chat_history: memory });

    return await addMessageToChat(chatId, resp.text, 'llm');
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

    const chatPrompt = PromptService.getConversationPrompt(
      Language.FRENCH,
      memory
    );
    const chain = ChainService.getConversationChain(
      ModelService.getOpenAi(),
      chatPrompt,
      memory
    );
    const resp = await chain.call({ input: query });
    return await addMessageToChat(chatId, resp.response, 'llm');
  };
}

export default LLMQuerier;
