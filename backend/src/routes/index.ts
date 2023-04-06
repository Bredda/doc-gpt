import { Router, Request, Response } from "express";
import auth from "./auth.js";
import project from './project.routes.js'
const routes = Router();

routes.use("/auth", auth);
routes.use("/", project)

export default routes;