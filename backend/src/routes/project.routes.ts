import { Router } from "express";
import ProjectController from "../controllers/project.controller.js";
import { checkJwt } from "../middlewares/checkJwt.js";
import multer from "multer"
import os from "os"
import LlmController from "../controllers/llm.controller.js";

const router = Router();

const uploadPath = multer({ dest: os.tmpdir() });
//Login route
router.get("/projects/:projectId", [checkJwt], ProjectController.getUserProjects)
router.get("/projects", [checkJwt], ProjectController.getUserProjects);
router.post("/projects", [checkJwt],ProjectController.createNewUserProject);
router.get("/projects/:projectId/chats", [checkJwt],ProjectController.getProjectChats);
router.get("/projects/:projectId/chats/:chatId", [checkJwt],ProjectController.getSpecificChat);
router.delete("/projects/:projectId", [checkJwt],ProjectController.deleteUserProject);
router.delete("/projects/:projectId/chats/:chatId", [checkJwt],ProjectController.deleteUserChat);

router.post("/projects/:projectId/chats", [checkJwt],ProjectController.createNewProjecthat);
router.put("/projects/:projectId/chats/:chatId/settings", [checkJwt], ProjectController.updateChatSettings)

router.post("/projects/:projectId/context",[checkJwt],uploadPath.single("file"), ProjectController.uploadToContext )
router.get("/projects/:projectId/context",[checkJwt],uploadPath.single("file"), ProjectController.getProjectContext )

router.post("/llm/ask", [checkJwt], LlmController.simpleQuery);

export default router;

