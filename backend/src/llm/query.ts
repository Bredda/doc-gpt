import { OpenAI } from "langchain";
const simpleQuery = async(query: string): Promise<string> => {

    const model = new OpenAI({ openAIApiKey: process.env.OPENAPI_KEY, temperature: 0.9 });
    return model.call(query);

}

export const queries = {
    simpleQuery
}