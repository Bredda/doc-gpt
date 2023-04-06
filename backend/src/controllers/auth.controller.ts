import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models/user.js";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { validate } from "class-validator";
import { AppDataSource } from "../config/data-source.js";
import config from "../config/config.js";
import { getUser, getUserById } from "../repositories/user.repository.js";

export interface ISigninPayload {
  email: string;
  password: string;
}

@Route("auth")
@Tags("User")
class AuthController {

  @Post("/signin")
  static signin = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    let user!: User;
    try {
      user = await getUser(email);
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.email },
      config.jwtSecret,
      { expiresIn: "2 days" }
    );

    

    //Send the jwt in the response
    res.send({id: user.id, email: user.email, token: token});
  };

  @Post("/signup")
  static signup = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { email, password, role } = req.body;
    let user = new User();
    user.email = email;
    user.password = password;
    user.role = role || 'USER';
  
    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    //Hash the password, to securely store on DB
    user.hashPassword();
  
    //Try to save. If fails, the username is already in use
    try {
      await AppDataSource.manager.save(user);
    } catch (e) {
      res.status(400).send(e);
      return;
    }
  
    //If all ok, send 201 response
    res.status(201).send({id: user.id, email: user.email, createdAt: user.createdAt});
  };
}

export default AuthController;