import logger from '../../common/logger';

const { MotorheadMemory } = require('langchain/memory');

export class MemoryService {
  static initMotorheadMemory = async (sessionId: string): Promise<any> => {
    logger.debug(`Motorhead memory initialization for chat ${sessionId}`);
    const memory = new MotorheadMemory({
      sessionId: sessionId,
      motorheadURL: `http://${process.env.MOTORHEAD_HOST}:${process.env.MOTORHEAD_SERVER_PORT}`
    });
    await memory.init();

    return memory;
  };
}
