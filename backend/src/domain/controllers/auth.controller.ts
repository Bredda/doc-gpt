import { Route, Tags, Post } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { AppDataSource } from '../../config/data-source';
import config from '../../config/config';
import { AppError, HttpCode } from '../../exceptions/exceptions';
import { User } from '../api/index';
import { getUser, emailAlreadyExists } from '../repositories/user.repository';

export interface ISigninPayload {
  email: string;
  password: string;
}

@Route('auth')
@Tags('User')
class AuthController {
  @Post('/signin')
  static signin = async (req: Request, res: Response, next: NextFunction) => {
    //Check if username and password are set
    const { email, password } = req.body;
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
      { expiresIn: '2 days' }
    );

    //Send the jwt in the response
    res.send({ id: user.id, email: user.email, token: token });
  };

  @Post('/signup')
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get parameters from the body
      const { email, password, role } = req.body;

      if (!email || !password)
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Email et password requis'
        });
      if (await emailAlreadyExists(email))
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: 'Email déjà utilisé'
        });

      const user = new User();
      user.email = email;
      user.password = password;
      user.role = role || 'USER';

      //Validade if the parameters are ok
      const errors = await validate(user);
      if (errors.length > 0) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errors.toString()
        });
      }

      //Hash the password, to securely store on DB
      user.hashPassword();

      //Try to save. If fails, the username is already in use
      try {
        await AppDataSource.manager.save(user);
      } catch (e: any) {
        throw new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: e.toString()
        });
      }

      //If all ok, send 201 response
      res
        .status(HttpCode.CREATED)
        .send({ id: user.id, email: user.email, createdAt: user.createdAt });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
