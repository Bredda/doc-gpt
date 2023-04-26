import {
  ConversationalRetrievalQAChain,
  ConversationChain
} from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import { BaseLLM } from 'langchain/llms/base';

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
