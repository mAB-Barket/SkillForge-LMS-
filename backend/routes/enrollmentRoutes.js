import express from 'express';
import { enrollCourse, getMyCourses } from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/enroll', protect, authorizeRoles('student'), enrollCourse);
router.get('/my-courses', protect, authorizeRoles('student'), getMyCourses);

export default router;
