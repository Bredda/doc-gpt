import { OpenAI } from 'langchain/llms/openai';
import { ChromaService } from '../src/llm/services/chroma.service';
import { DocumentService } from '../src/llm/services/document.service';
import { ChainService } from '../src/llm/services/chain.service';
import { ModelService } from '../src/llm/services/model.service';

const SOURCES = {
  state_union: '../test_documents/state_of_the_union.txt'
};

export const ingest = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const docs = await DocumentService.createDocFromFilePath(SOURCES.state_union);
  await ChromaService.addDocToCollection('test_ingest4', docs);
  console.log(docs.length);
  console.log(docs[0]);
};

export const retrieve = async () => {
  const collection = await ChromaService.getCollection('test_ingest4');
  const docs = await collection.collection?.get(undefined, {
    source: SOURCES.state_union
  });
  console.log(docs.documents.length);
  console.log(docs.documents[0]);
};

export const summarizeIngest = async () => {
  const docs = await DocumentService.createDocFromFilePath(SOURCES.state_union);
  await ChromaService.addDocToCollection('test_ingest4', docs);

  const chain = ChainService.getSummarizationChain(ModelService.getOpenAi());

  const res = await chain.call({
    input_documents: docs
  });
  console.log({ res });
};

export const summarizeRetrieve = async () => {
  /* Initialize the LLM to use to answer the question */
  const collection = await ChromaService.getCollection('test_ingest4');
  const docs = await collection.collection?.get(undefined, {
    source: SOURCES.state_union
  });
  console.log(docs.documents.length);

  const chain = ChainService.getSummarizationChain(ModelService.getOpenAi());

  const res = await chain.call({
    input_documents: docs.documents
  });
  console.log({ res });
};

(async () => {
  await summarizeRetrieve();
})();
