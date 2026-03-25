import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

export const getAdminReports = async (req, res) => {
  try {
    const [totalUsers, totalStudents, totalInstructors, totalCourses, totalEnrollments] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'instructor' }),
      Course.countDocuments(),
      Enrollment.countDocuments()
    ]);

    const revenueAggregation = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseData'
        }
      },
      { $unwind: '$courseData' },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$courseData.price' }
        }
      }
    ]);

    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    return res.status(200).json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
      totalRevenue
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
