import { Router } from 'express';
import { protect, managerOnly } from '../middleware/authMiddleware';
import { getAllUsers, deleteUser } from '../controllers/userController';

const router = Router();

router.route('/')
  .get(protect, managerOnly, getAllUsers);

router.route('/:id')
  .delete(protect, managerOnly, deleteUser);

export default router;