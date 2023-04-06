import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { AppDataSource } from "../config/data-source.js";


export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    let user: User;
    try {
        user = await AppDataSource.manager.findOneByOrFail(User, {
            id: 1,
        })
        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    } catch (id) {
      res.status(401).send();
    }


  };
};