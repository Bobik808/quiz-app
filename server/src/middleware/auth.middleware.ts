import jwt from 'jsonwebtoken';
import {User} from '../models/auth.model';
import { NextFunction, Request, Response } from 'express';
const SECRET_KEY = 'secretkey';

// declare namespace Express {
//   export interface Request {
//     user?: {
//       name: string,
//       email: string,
//       password: string
//     }
//   }
// }

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log('HELLOOOOOOOO');
  const authHeaders = req.headers.authorization;
  console.log('AuthHeaders', authHeaders);
  // console.log('req.headers', req.headers);
  if (!authHeaders) return res.sendStatus(403);
  const _id = await jwt.verify((<string>authHeaders).split(' ')[1], SECRET_KEY);
  console.log('_id', _id);
  try {
    const user = await User.findOne({ _id });
    console.log('USER', user);
    // if (!user) return res.sendStatus(401);
    // req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};


// export const authMiddleware = async (req, res, next) => {

//   const authHeaders = req.headers['authorization'];
//   if (!authHeaders) return res.sendStatus(403);
//   const token = authHeaders.split(' ')[1]; // why splitting with space

//   try {

//     const { _id } = jwt.verify(token, SECRET_KEY);

//     const user = await User.findOne({ _id });
//     if (!user) return res.sendStatus(401);
//     req.user = user;
//     next();
//   } catch (error) {
//     res.sendStatus(401);
//   }

// };

