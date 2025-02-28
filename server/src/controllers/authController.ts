import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

interface AuthResponse {
  user: {
    _id: string;
    login: string;
    role: 'manager' | 'employee';
  };
  token: string;
}

const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { login, password, role } = req.body;
    
    const userExists = await User.findOne({ login });
    if (userExists) {
      res.status(400).json({ error: 'Пользователь уже существует' });
      return;
    }

    const user = await User.create({
      login,
      password,
      role: role === 'manager' ? 'manager' : 'employee'
    });

    const response: AuthResponse = {
      user: {
        _id: user._id.toString(),
        login: user.login,
        role: user.role
      },
      token: generateToken(user)
    };

    res.status(201).json(response);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ error: 'Неверные учетные данные' });
      return;
    }

    const response: AuthResponse = {
      user: {
        _id: user._id.toString(),
        login: user.login,
        role: user.role
      },
      token: generateToken(user)
    };

    res.json(response);
  } catch (error: any) {
    next(error);
  }
};