import { ChromaService } from '../src/llm/services/chroma.service';
import { ChainService } from '../src/llm/services/chain.service';
import { ModelService } from '../src/llm/services/model.service';
import { DocumentService } from '../src/llm/services/document.service';

const SOURCES = {
  state_union: './tests/docs/state_of_the_union.txt'
};

export const run = async () => {
  /* Create the chain */
  const chain = ChainService.getChatQAChain(
    ModelService.getOpenAi(),
    await ChromaService.getCollection('test_ingest')
  );
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
