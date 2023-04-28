import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/dist/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import logger from '../../common/logger';

export class DocumentService {
  static createDocFromFile = async (
    file: Express.Multer.File
  ): Promise<Document<Record<string, any>>[]> => {
    logger.debug(`Loading ans splitting file ${file.path}`);
    let loader;

    switch (file.mimetype) {
      case 'text/plain':
        loader = new TextLoader(file.path);
        break;
      case 'application/pdf':
        loader = new PDFLoader(file.path, {
          splitPages: false
        });
        break;
      default:
        loader = new TextLoader(file.path);
        break;
    }

    return await loader.loadAndSplit(
      new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    );
  };

  static createDocFromFilePath = async (
    path: string
  ): Promise<Document<Record<string, any>>[]> => {
    const loader = new TextLoader(path);
    return await loader.loadAndSplit(
      new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    );
  };
}
