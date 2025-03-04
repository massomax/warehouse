import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getWarehouses } from '../controllers/warehouseController';
import type { RequestHandler } from 'express';

const router = Router();

const managerOnly: RequestHandler = (req, res, next) => {
  if (req.user?.role !== 'manager') {
    res.status(403).json({ error: "Доступ запрещен" });
    return;
  }
  next();
};

router.get(
  '/',
  protect,
  managerOnly,
  getWarehouses
);

export default router;