import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs';
import { Document } from 'langchain/dist/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';

export const createDoc = async (
  path: string
): Promise<Document<Record<string, any>>[]> => {
  /* Load in the file we want to do question answering over */
  const loader = new TextLoader(path);
  return await loader.loadAndSplit(new RecursiveCharacterTextSplitter());
};
