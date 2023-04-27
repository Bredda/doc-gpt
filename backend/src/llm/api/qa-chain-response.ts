import { Document } from 'langchain/dist/document';

export interface QAChainResponse {
  text: string;
  sourceDocuments: Document[];
}

/**
 * document.metadata
 * {
  source: '../test_documents/state_of_the_union.txt',
  loc: { lines: { from: 562, to: 572 } }
}
{
  source: '../test_documents/state_of_the_union.txt',
  loc: { lines: { from: 572, to: 582 } }
}
{
  source: '../test_documents/state_of_the_union.txt',
  loc: { lines: { from: 598, to: 608 } }
}
{
  source: '../test_documents/state_of_the_union.txt',
  loc: { lines: { from: 608, to: 618 } }
}
 * 
 */
