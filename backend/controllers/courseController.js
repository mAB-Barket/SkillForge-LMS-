import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description and category are required' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price: Number(price || 0),
      instructor: req.user._id
    });

    return res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You are not allowed to update this course' });
    }

    const fields = ['title', 'description', 'category', 'price'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = field === 'price' ? Number(req.body[field]) : req.body[field];
      }
    });

    const updatedCourse = await course.save();
    return res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You are not allowed to delete this course' });
    }

    await course.deleteOne();
    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadLesson = async (req, res) => {
  try {
    const { title, content, videoUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Lesson title and content are required' });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isOwner = course.instructor.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You are not allowed to add lessons to this course' });
    }

    course.lessons.push({ title, content, videoUrl: videoUrl || '' });
    await course.save();

    return res.status(201).json({ message: 'Lesson uploaded successfully', course });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
