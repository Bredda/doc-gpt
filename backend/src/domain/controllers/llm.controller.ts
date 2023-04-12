import { Route, Tags, Post } from 'tsoa';
import { Request, Response } from 'express';
import { addMessageToChat } from '../repositories/chat.repository.js';

@Route('llm')
@Tags('LLM')
class LlmController {
  @Post('/llm/ask')
  static simpleQuery = async (req: Request, res: Response) => {
    const { chatId, query } = req.body;
    await addMessageToChat(chatId, query, 'user');
    const resp = '';
    const chat = await addMessageToChat(chatId, resp, 'llm');
    res.send(chat);
  };
}

export default LlmController;
