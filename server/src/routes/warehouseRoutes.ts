import { Router } from 'express';
import { protect, managerOnly } from '../middleware/authMiddleware';
import { createWarehouse, getWarehouses } from '../controllers/warehouseController';

const router = Router();

router.route('/')
  .post(protect, managerOnly, createWarehouse)
  .get(protect, managerOnly, getWarehouses);


router.get('/', protect, managerOnly, getWarehouses);
export default router;