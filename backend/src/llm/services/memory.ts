import logger from '../../common/logger';
import config from '../../config/config';

const { MotorheadMemory } = require('langchain/memory');

export class MemoryService {
  static initMotorheadMemory = async (sessionId: string): Promise<any> => {
    logger.debug(`Init Motorhead memory for chat ${sessionId}`);
    const memory = new MotorheadMemory({
      sessionId: sessionId,
      motorheadURL: `http://${config.MOTORHEAD_HOST}:${config.MOTORHEAD_PORT}`
    });
    await memory.init();
    return memory;
  };
}
