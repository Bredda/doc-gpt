import { Router } from "express";
import ProjectController from "../controllers/project.controller.js";
import { checkJwt } from "../middlewares/checkJwt.js";
import LlmController from "../controllers/llm.controller.js";

const router = Router();

//Login route
router.post("/llm/ask", [checkJwt], LlmController.simpleQuery);
export default router;