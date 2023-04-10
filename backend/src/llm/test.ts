import { OpenAI } from 'langchain/llms';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const model = new OpenAI({});
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory });
const res1 = await chain.call({ input: "Hi! I'm Jim." });
console.log({ res1 });

memory.returnMessages;
