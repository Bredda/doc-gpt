import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/dist/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import logger from '../../common/logger';
import { MIMEType } from 'util';
import { OriginalDocument } from '../../domain/api';

export class DocumentService {
  static createDocument = async (
    file: OriginalDocument | Express.Multer.File
  ) => {
    logger.debug(`Creating doc for file ${file.path}`);
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

    return await loader.loadAndSplit(new RecursiveCharacterTextSplitter());
  };
}
