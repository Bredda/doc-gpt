import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/dist/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import logger from '../../common/logger';
import { MIMEType } from 'util';
import { OriginalDocument } from '../../domain/api';
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import config from '../../config/config';

export class DocumentService {
  static createDocument = async (
    file: OriginalDocument | Express.Multer.File
  ) => {
    logger.debug(`Creating doc for file ${file.path}`);
    let apiUrl=`http://${config.UNSTRUCTURED_API_HOST}:${config.UNSTRUCTURED_API_PORT}/general/v0/general`;
    let loader = new UnstructuredLoader( apiUrl,file.path);
    return await loader.loadAndSplit(new RecursiveCharacterTextSplitter());
  };
}
