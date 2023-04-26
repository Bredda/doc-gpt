import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/dist/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import logger from '../../common/logger';

export class DocumentService {
  static createDocFromFile = async (
    path: string
  ): Promise<Document<Record<string, any>>[]> => {
    logger.debug(`Loading ans splitting file ${path}`);
    const loader = new TextLoader(path);
    return await loader.loadAndSplit(new RecursiveCharacterTextSplitter());
  };
}
