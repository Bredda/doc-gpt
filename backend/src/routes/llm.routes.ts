import { Router } from 'express';
import LlmController from '../controllers/llm.controller.js';
import { checkJwt } from '../middlewares/checkJwt.js';

const router = Router();

//LLM
router.post('/ask', [checkJwt], LlmController.simpleQuery);
export default router;
