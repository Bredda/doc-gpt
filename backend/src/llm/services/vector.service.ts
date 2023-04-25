import { OriginalDocument } from '../../domain/api';
import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import config from '../../config/config';

export const addDocToStore = async (
  collectionName: string,
  doc: OriginalDocument
) => {
  // Create docs with a loader
  const loader = new TextLoader(doc.path);
  const docs = await loader.load();
  try {
    // Create vector store and index the docs
    const vectorStore = await Chroma.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: config.OPENAI_API_KEY }),
      {
        url: `http://localhost:${config.CHROMA_PORT}`,
        collectionName: collectionName
      }
    );
  } catch (err: any) {
    console.log(err);
  }
};
