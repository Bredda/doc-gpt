import {
  ConversationalRetrievalQAChain,
  ConversationChain,
  loadSummarizationChain
} from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import { BaseLLM } from 'langchain/llms/base';
import logger from '../../common/logger';

export class ChainService {
  static getChatQAChain = (
    model: BaseLLM,
    vectorStore: Chroma
  ): ConversationalRetrievalQAChain => {
    return ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      { returnSourceDocuments: true }
    );
  };

  static getSummarizationChain = (model: BaseLLM) => {
    return loadSummarizationChain(model, { type: 'map_reduce' });
  };

  static getConversationChain = (
    model: BaseLLM,
    prompt: any,
    memory: any
  ): ConversationChain => {
    return new ConversationChain({
      memory,
      prompt: prompt,
      llm: model
    });
  };
}
