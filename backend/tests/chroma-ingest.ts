import { OpenAI } from 'langchain/llms/openai';
import { ChromaService } from '../src/llm/services/chroma.service';
import { DocumentService } from '../src/llm/services/document.service';

const SOURCES = {
  state_union: '../test_documents/state_of_the_union.txt'
};

export const run = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const docs = await DocumentService.createDocFromFile(SOURCES.state_union);
  const vectorStore = await ChromaService.addDocToCollection(
    'test_ingest',
    docs
  );
};

run();
