import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

dotenv.config();

const demoCourses = [
  { title: 'SkillForge Demo Course 01 - MERN Basics', category: 'Web Development', price: 2500 },
  { title: 'SkillForge Demo Course 02 - React Foundations', category: 'Frontend', price: 3200 },
  { title: 'SkillForge Demo Course 03 - Node and Express API', category: 'Backend', price: 3600 },
  { title: 'SkillForge Demo Course 04 - MongoDB Essentials', category: 'Database', price: 2800 },
  { title: 'SkillForge Demo Course 05 - JWT and Security', category: 'Security', price: 3400 },
  { title: 'SkillForge Demo Course 06 - UI Design Systems', category: 'UI/UX', price: 3000 },
  { title: 'SkillForge Demo Course 07 - Advanced React Patterns', category: 'Frontend', price: 4200 },
  { title: 'SkillForge Demo Course 08 - Full Stack Project Build', category: 'Full Stack', price: 5000 },
  { title: 'SkillForge Demo Course 09 - Testing APIs', category: 'Testing', price: 2700 },
  { title: 'SkillForge Demo Course 10 - Deployment and DevOps', category: 'DevOps', price: 3900 },
  { title: 'SkillForge Demo Course 11 - TypeScript for MERN', category: 'Programming', price: 4100 },
  { title: 'SkillForge Demo Course 12 - Performance Optimization', category: 'Performance', price: 3300 },
  { title: 'SkillForge Demo Course 13 - Authentication Deep Dive', category: 'Security', price: 3500 },
  { title: 'SkillForge Demo Course 14 - Redux and State Management', category: 'Frontend', price: 3700 },
  { title: 'SkillForge Demo Course 15 - Real-World LMS Features', category: 'Full Stack', price: 4800 }
];

const seedCourses = async () => {
  try {
    await connectDB();

    let instructor = await User.findOne({ email: 'demo.instructor@skillforge.com' });

    if (!instructor) {
      instructor = await User.create({
        name: 'Demo Instructor',
        email: 'demo.instructor@skillforge.com',
        password: 'Instructor@123',
        role: 'instructor'
      });
      console.log('Created demo instructor: demo.instructor@skillforge.com / Instructor@123');
    }

    await Course.deleteMany({ title: { $regex: '^SkillForge Demo Course' } });

    const coursesToInsert = demoCourses.map((course, index) => ({
      ...course,
      description: `This is a seeded demo description for ${course.title}. It is added for testing workflows in SkillForge LMS.`,
      instructor: instructor._id,
      lessons: [
        {
          title: `Lesson 1 - Introduction (${index + 1})`,
          content: 'Overview, goals, and setup for this course.',
          videoUrl: ''
        },
        {
          title: `Lesson 2 - Hands-on Practice (${index + 1})`,
          content: 'Practical implementation tasks and walkthrough.',
          videoUrl: ''
        }
      ]
    }));

    await Course.insertMany(coursesToInsert);

    console.log('Seed complete: inserted 15 demo courses.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedCourses();
