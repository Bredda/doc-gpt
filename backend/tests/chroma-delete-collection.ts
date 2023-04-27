import { ChromaService } from '../src/llm/services/chroma.service';
import { ChainService } from '../src/llm/services/chain.service';
import { ModelService } from '../src/llm/services/model.service';
import { DocumentService } from '../src/llm/services/document.service';

const SOURCES = {
  state_union: './tests/docs/state_of_the_union.txt'
};

export const run = async () => {
  /* Create the chain */
  await ChromaService.deleteCollection(
    'langchain-73cb81ab-34cb-44fa-8d42-6dbbf6c2b777'
  );
  console.log('Done');
};

run();
