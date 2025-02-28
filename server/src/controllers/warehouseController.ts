import { Request, Response, NextFunction } from 'express';
import Warehouse from '../models/Warehouse';

export const createWarehouse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Не авторизован' });
        return; // Явный возврат
      }
  
      const warehouse = await Warehouse.create({
        ...req.body,
        manager: req.user._id
      });
  
      res.status(201).json(warehouse);
    } catch (error) {
      next(error); // Передача ошибки в обработчик
    }
  };

  // export const getWarehouses = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const warehouses = await Warehouse.find({ manager: req.user!._id });
  //     res.json(warehouses);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const getWarehouses = async (req: Request, res: Response) => {
  //   try {
  //     const warehouses = await Warehouse.find({ manager: req.user!._id })
  //       .populate('manager', 'login role');
  //     res.json(warehouses);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Ошибка получения складов' });
  //   }
  // };

  export const getWarehouses = async (req: Request, res: Response) => {
    try {
      const warehouses = await Warehouse.find({ manager: req.user!._id });
      console.log('[SERVER] Warehouses:', warehouses); // Добавьте эту строку
      res.json(warehouses);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения складов' });
    }
  };
  
  export const getWarehouse = async (req: Request, res: Response) => {
    try {
      const warehouse = await Warehouse.findById(req.params.id)
        .populate('manager', 'login role');
      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения данных склада' });
    }
  };