import React, { useEffect, useState } from 'react';
import { deleteCourse, getCourses } from '../../services/courseService';

const AdminManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      const data = await deleteCourse(id);
      setMessage(data.message);
      setError('');
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
      setMessage('');
    }
  };

  return (
    <section className="page-section">
      <h2 className="section-heading">Manage Courses</h2>
      <p className="section-subtitle">Review all published courses and remove any invalid entries.</p>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive table-shell">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.instructor?.name}</td>
                <td>PKR {Number(course.price).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No courses available.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminManageCoursesPage;
