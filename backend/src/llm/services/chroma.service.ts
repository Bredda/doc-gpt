import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';
import { Chroma } from 'langchain/vectorstores/chroma';
export class ChromaService {
  static addDocToCollection = async (
    collectionName: string,
    docs: Document<Record<string, any>>[]
  ): Promise<Chroma> => {
    return await Chroma.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      {
        collectionName: collectionName,
        url: `http://localhost:${process.env.CHROMA_SERVER_PORT}`
      }
    );
  };
}
