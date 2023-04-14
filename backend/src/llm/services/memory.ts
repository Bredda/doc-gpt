const { MotorheadMemory } = require('langchain/memory');

export const initMotorheadMemory = async (sessionId: string): Promise<any> => {
  const memory = new MotorheadMemory({
    sessionId: sessionId,
    motorheadURL: process.env.MOTORHEAD_URL
  });
  await memory.init();
  return memory;
};
