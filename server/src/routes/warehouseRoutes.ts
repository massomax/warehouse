import { Router } from 'express';
import { protect, managerOnly } from '../middleware/authMiddleware';
import { createWarehouse, getWarehouses } from '../controllers/warehouseController';
import { RequestHandler } from 'express';


const router = Router();

router.route('/')
  .post(protect, managerOnly, createWarehouse)


const managerOnlyMiddleware: RequestHandler = (req, res, next) => {
    if (req.user?.role !== 'manager') {
      res.status(403).json({ error: "Доступ запрещен" });
      return;
    }
    next();
  };
  
  router.get(
    '/',
    protect,
    managerOnlyMiddleware,
    getWarehouses
  );

  export default router;