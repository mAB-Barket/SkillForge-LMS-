import express from 'express';
import { getAdminReports } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/reports', protect, authorizeRoles('admin'), getAdminReports);

export default router;
