import { OpenAI } from 'langchain/llms/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs';
import { createDoc } from './utils/docs';
import { ChromaService } from '../src/llm/services/chroma.service';
import { ChainService } from '../src/llm/services/chain.service';

const SOURCES = {
  state_union: './tests/docs/state_of_the_union.txt',
  solution_review: './tests/docs/Solution Review.txt'
};

export const run = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const docs = await createDoc(SOURCES.state_union);
  /* Create the vectorstore */
  const vectorStore = await ChromaService.addDocToCollection('', docs);

  /* Create the chain */
  const chain = ChainService.getChatQAChain(model, vectorStore);
  /* Ask it a question */
  const question = 'What did the president say about Justice Breyer?';
  const res = await chain.call({ question, chat_history: [] });
  console.log(res);
  /* Ask it a follow up question */
  const chatHistory = question + res.text;
  const followUpRes = await chain.call({
    question: 'Was that nice?',
    chat_history: chatHistory
  });
  console.log(followUpRes);
};

run();
