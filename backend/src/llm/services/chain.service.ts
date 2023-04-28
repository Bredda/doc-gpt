import {
  ConversationalRetrievalQAChain,
  ConversationChain,
  loadSummarizationChain,
  MapReduceDocumentsChain,
  StuffDocumentsChain
} from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import { BaseLLM } from 'langchain/llms/base';
import logger from '../../common/logger';

export class ChainService {
  static getChatQAChain = (
    model: BaseLLM,
    vectorStore: Chroma
  ): ConversationalRetrievalQAChain => {
    logger.debug(
      `Init conversational retrieval QA chain with model ${model.name}`
    );
    return ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      { returnSourceDocuments: true }
    );
  };

  static getConversationChain = (
    model: BaseLLM,
    prompt: any,
    memory: any
  ): ConversationChain => {
    logger.debug(`Init conversational chain with model ${model.name}`);
    return new ConversationChain({
      memory,
      prompt: prompt,
      llm: model
    });
  };

  static getSummarizationChain = (
    model: BaseLLM
  ): StuffDocumentsChain | MapReduceDocumentsChain => {
    return loadSummarizationChain(model);
  };
}
