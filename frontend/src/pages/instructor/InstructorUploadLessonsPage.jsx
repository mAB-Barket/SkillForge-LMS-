import React, { useEffect, useMemo, useState } from 'react';
import { getCourses, uploadLesson } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const InstructorUploadLessonsPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    content: '',
    videoUrl: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const myCourses = useMemo(
    () => courses.filter((course) => course.instructor?._id === user?.id || course.instructor?._id === user?._id),
    [courses, user]
  );

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      }
    };

    loadCourses();
  }, []);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await uploadLesson(formData.courseId, {
        title: formData.title,
        content: formData.content,
        videoUrl: formData.videoUrl
      });
      setMessage(data.message);
      setError('');
      setFormData({ courseId: '', title: '', content: '', videoUrl: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload lesson');
      setMessage('');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="form-shell">
          <h2 className="section-heading">Upload Lessons</h2>
          <p className="section-subtitle">Attach structured lessons to courses you manage.</p>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select
              className="form-select"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">Choose course</option>
              {myCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Lesson Title</label>
            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Lesson Content</label>
            <textarea
              className="form-control"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Video URL (optional)</label>
            <input
              className="form-control"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-brand" type="submit">
            Upload Lesson
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default InstructorUploadLessonsPage;
