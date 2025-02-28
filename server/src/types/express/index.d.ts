import { IUser } from '../../../models/User'; // Путь зависит от вашей структуры

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Расширяем объект Request
    }
  }
}