import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';

export const getAllUsers = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUser[] | null = await User.find().select('-password');
    res.status(200).json(users);
    return 
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      res.status(404).json({ error: 'Пользователь не найден' });
      return 
    }

    res.status(200).json({ message: 'Пользователь удален' });
  } catch (error: any) {
    next(error);
  }
};