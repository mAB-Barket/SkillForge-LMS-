import React, { useEffect, useState } from 'react';
import { getMyCourses } from '../../services/courseService';

const StudentMyCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const data = await getMyCourses();
        setEnrollments(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load enrolled courses');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const completedCourses = enrollments.filter((item) => item.progress >= 100).length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, item) => sum + item.progress, 0) / enrollments.length)
    : 0;
  const learningBars = enrollments.slice(0, 6);

  return (
    <section className="page-section">
      <h2 className="section-heading">My Courses</h2>
      <p className="section-subtitle">Track your enrolled courses and progress.</p>
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && enrollments.length > 0 ? (
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <div className="panel-card card p-3 h-100">
              <p className="text-muted small mb-1">Enrolled Courses</p>
              <h4 className="mb-0">{enrollments.length}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-card card p-3 h-100">
              <p className="text-muted small mb-1">Completed</p>
              <h4 className="mb-0">{completedCourses}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-card card p-3 h-100">
              <p className="text-muted small mb-1">Average Progress</p>
              <h4 className="mb-0">{avgProgress}%</h4>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="panel-card card p-3 h-100">
              <h5 className="mb-1">Progress Graph View</h5>
              <p className="text-muted small mb-3">Progress levels for your latest enrolled courses.</p>
              <div className="mini-bar-chart">
                {(learningBars.length ? learningBars : [{ _id: 'empty', progress: 0 }]).map((item, index) => (
                  <div className="mini-bar-col" key={item._id || index}>
                    <div className="mini-bar" style={{ height: `${Math.max(item.progress || 0, 10)}%` }} />
                    <span>{item.course?.title?.slice(0, 3) || `C${index + 1}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="panel-card card p-3 h-100">
              <h5 className="mb-1">Completion Meter</h5>
              <p className="text-muted small mb-3">Your current learning performance snapshot.</p>
              <div className="donut-meter" style={{ '--pct': `${avgProgress}%` }}>
                <div>
                  <strong>{avgProgress}%</strong>
                  <p>overall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {loading ? <p>Loading your courses...</p> : null}

      {!loading && enrollments.length === 0 ? (
        <div className="empty-state">No enrolled courses yet.</div>
      ) : (
        <div className="row g-3">
          {enrollments.map((item) => (
            <div className="col-md-6" key={item._id}>
              <div className="course-card card h-100">
                <div className="card-body">
                  <span className="chip mb-2">{item.course?.category}</span>
                  <h5>{item.course?.title}</h5>
                  <p className="text-muted">{item.course?.description}</p>
                  <p className="small mb-2">
                    <strong>Instructor:</strong> {item.course?.instructor?.name}
                  </p>
                  <div className="progress mb-1">
                    <div className="progress-bar" style={{ width: `${item.progress}%` }} />
                  </div>
                  <p className="mb-0 small fw-semibold">Progress: {item.progress}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentMyCoursesPage;
