import React, { useEffect, useMemo, useState } from 'react';
import { deleteCourse, getCourses, updateCourse } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const InstructorManageCoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const myCourses = useMemo(
    () => courses.filter((course) => course.instructor?._id === user?.id || course.instructor?._id === user?._id),
    [courses, user]
  );

  const totalPortfolioValue = useMemo(
    () => myCourses.reduce((sum, course) => sum + Number(course.price || 0), 0),
    [myCourses]
  );

  const topCoursePrice = useMemo(
    () => myCourses.reduce((max, course) => Math.max(max, Number(course.price || 0)), 0),
    [myCourses]
  );

  const categorySummary = useMemo(() => {
    const bucket = {};
    myCourses.forEach((course) => {
      const key = course.category || 'General';
      bucket[key] = (bucket[key] || 0) + 1;
    });
    return Object.entries(bucket)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [myCourses]);

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

  const handleEdit = async (course) => {
    const title = prompt('New title:', course.title);
    if (!title) return;

    try {
      const data = await updateCourse(course._id, { title });
      setMessage(data.message);
      setError('');
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      setMessage('');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      const data = await deleteCourse(id);
      setMessage(data.message);
      setError('');
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
      setMessage('');
    }
  };

  return (
    <section className="page-section">
      <h2 className="section-heading">Manage Courses</h2>
      <p className="section-subtitle">Update titles quickly or remove courses you no longer offer.</p>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="panel-card card p-3 h-100">
            <p className="text-muted small mb-1">Published Courses</p>
            <h4 className="mb-0">{myCourses.length}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel-card card p-3 h-100">
            <p className="text-muted small mb-1">Portfolio Value</p>
            <h4 className="mb-0">PKR {totalPortfolioValue.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel-card card p-3 h-100">
            <p className="text-muted small mb-1">Top Course Price</p>
            <h4 className="mb-0">PKR {topCoursePrice.toLocaleString()}</h4>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="panel-card card p-3 h-100">
            <h5 className="mb-1">Category Spread</h5>
            <p className="text-muted small mb-3">How your course catalog is distributed by category.</p>
            <div className="d-flex flex-column gap-3">
              {categorySummary.length === 0 ? (
                <div className="empty-state">Create your first course to view category analytics.</div>
              ) : (
                categorySummary.map((item) => (
                  <div key={item.category}>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{item.category}</span>
                      <strong>{item.count}</strong>
                    </div>
                    <div className="graph-track">
                      <div
                        className="graph-fill tone-instructor"
                        style={{ width: `${Math.max((item.count / Math.max(categorySummary[0].count, 1)) * 100, 10)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="panel-card card p-3 h-100">
            <h5 className="mb-1">Pricing Meter</h5>
            <p className="text-muted small mb-3">Relative strength of your highest priced course.</p>
            <div
              className="donut-meter"
              style={{ '--pct': `${topCoursePrice ? Math.min(Math.round((topCoursePrice / 20000) * 100), 100) : 0}%` }}
            >
              <div>
                <strong>{topCoursePrice ? `${Math.min(Math.round((topCoursePrice / 20000) * 100), 100)}%` : '0%'}</strong>
                <p>of target</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive table-shell">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>PKR {Number(course.price).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(course)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {myCourses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  You have not created any courses yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InstructorManageCoursesPage;
