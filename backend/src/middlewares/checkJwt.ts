import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getUserById } from '../domain/repositories/user.repository';

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  let token = <string>req.headers['authorization'];
  let jwtPayload;
  if (!token) {
    res.status(401).send();
    return;
  }
  token = token.replace('Bearer ', '');
  //Try to validate the token and get data
  //@TODO: check user in given token
  try {
    jwtPayload = <any>jwt.verify(token, config.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
    await getUserById(jwtPayload.userId);
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.JWT_SECRET, {
    expiresIn: '2 days'
  });
  res.setHeader('token', newToken);

  //Call the next middleware or controller
  next();
};
