import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/auth.model';
const SECRET_KEY = 'secretkey';//! MOVE TO .ENV


exports.register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
      dateJoined: new Date().toISOString(),
    });

    console.log('new user', newUser);
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    console.log('accessToken', accessToken);
    res.status(201).send({ accessToken });

  } catch (error) {
    res.status(400).send({ error, message: 'Could not create a goddamn user' });
  }

};

//exports.login = async () => {}

export default exports;

