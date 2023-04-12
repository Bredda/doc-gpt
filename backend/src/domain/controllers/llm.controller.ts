import { Route, Tags, Post } from 'tsoa';
import { Request, Response } from 'express';
import { addMessageToChat } from '../repositories/chat.repository.js';
import { queries } from '../../llm/query.js';

@Route('llm')
@Tags('LLM')
class LlmController {
  @Post('/llm/ask')
  static simpleQuery = async (req: Request, res: Response) => {
    const { chatId, query } = req.body;
    await addMessageToChat(chatId, query, 'user');
    const resp = await queries.simpleQuery(query);
    const chat = await addMessageToChat(chatId, resp, 'llm');
    res.send(chat);
  };
}

export default LlmController;
