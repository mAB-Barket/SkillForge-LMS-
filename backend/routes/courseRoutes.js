import express from 'express';
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
  uploadLesson
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/').get(getCourses).post(protect, authorizeRoles('instructor', 'admin'), createCourse);
router
  .route('/:id')
  .get(getCourseById)
  .put(protect, authorizeRoles('instructor', 'admin'), updateCourse)
  .delete(protect, authorizeRoles('instructor', 'admin'), deleteCourse);

router.post('/:id/lessons', protect, authorizeRoles('instructor', 'admin'), uploadLesson);

export default router;
