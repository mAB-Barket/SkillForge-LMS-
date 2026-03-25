import express from 'express';
import { deleteUser, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getUsers);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

export default router;
