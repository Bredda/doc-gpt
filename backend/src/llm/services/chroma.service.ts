import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';
import { Chroma } from 'langchain/vectorstores/chroma';
import { DocumentService } from './document.service';
import config from '../../config/config';
import logger from '../../common/logger';
import { ChromaClient } from 'chromadb';
import { AppError, HttpCode } from '../../exceptions/exceptions';

export class ChromaService {
  private static getChromaSettings = (collectionName: string) => {
    return {
      url: `http://${config.CHROMA_HOST}:${config.CHROMA_PORT}`,
      collectionName: collectionName
    };
  };

  private static getOpenAiEmbeddings = () => {
    return new OpenAIEmbeddings({ openAIApiKey: config.OPENAI_API_KEY });
  };

  static getCollection = (collectionName: string) => {
    logger.debug(`Retrieving from store collection ${collectionName}`);
    return Chroma.fromExistingCollection(
      this.getOpenAiEmbeddings(),
      this.getChromaSettings(collectionName)
    );
  };

  static deleteCollection = async (collectionName: string) => {
    logger.debug(`Deleting from store collection ${collectionName}`);
    const client = new ChromaClient(
      `http://${config.CHROMA_HOST}:${config.CHROMA_PORT}`
    );
    await client.deleteCollection(collectionName);
  };

  static addDocToCollection = async (
    collectionName: string,
    docs: Document<Record<string, any>>[]
  ): Promise<Chroma> => {
    logger.debug(`Adding docs to store in collection ${collectionName}`);
    try {
      return await Chroma.fromDocuments(
        docs,
        this.getOpenAiEmbeddings(),
        this.getChromaSettings(collectionName)
      );
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'A problem occured while saving to vector store'
      });
    }
  };

  static addFileToCollection = async (
    collectionName: string,
    file: Express.Multer.File
  ) => {
    logger.debug(
      `Adding file ${file.path} to store in collection ${collectionName}`
    );
    return this.addDocToCollection(
      collectionName,
      await DocumentService.createDocFromFile(file)
    );
  };
}
