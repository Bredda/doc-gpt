import { Router } from "express";
import ProjectController from "../controllers/project.controller.js";
import { checkJwt } from "../middlewares/checkJwt.js";
import multer from "multer"
import os from "os"

const router = Router();

const uploadPath = multer({ dest: os.tmpdir() });

//PROJECT
router.get("/projects/:projectId", [checkJwt], ProjectController.getUserProjects)
router.get("/projects", [checkJwt], ProjectController.getUserProjects);
router.post("/projects", [checkJwt],ProjectController.createNewUserProject);
router.delete("/projects/:projectId", [checkJwt],ProjectController.deleteUserProject);
//CHAT
router.get("/projects/:projectId/chats", [checkJwt],ProjectController.getProjectChats);
router.get("/projects/:projectId/chats/:chatId", [checkJwt],ProjectController.getSpecificChat);
router.delete("/projects/:projectId/chats/:chatId", [checkJwt],ProjectController.deleteUserChat);
router.post("/projects/:projectId/chats", [checkJwt],ProjectController.createNewProjecthat);
router.put("/projects/:projectId/chats/:chatId/settings", [checkJwt], ProjectController.updateChatSettings)
//CONTEXT
router.post("/projects/:projectId/context",[checkJwt],uploadPath.single("file"), ProjectController.uploadToContext )
router.get("/projects/:projectId/context",[checkJwt],uploadPath.single("file"), ProjectController.getProjectContext )


export default router;

