import { MotorheadMemory } from 'langchain/memory';

export const initMotorheadMemory = async (
  sessionId: string
): Promise<MotorheadMemory> => {
  const memory = new MotorheadMemory({
    sessionId: sessionId,
    motorheadURL: process.env.MOTORHEAD_URL
  });
  await memory.init();
  return memory;
};
