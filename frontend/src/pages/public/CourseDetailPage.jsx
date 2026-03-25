import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enrollInCourse, getCourseById } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      const data = await enrollInCourse(id);
      setMessage(data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
      setMessage('');
    } finally {
      setEnrolling(false);
    }
  };

  if (error && !course) return <div className="alert alert-danger">{error}</div>;
  if (loading || !course) return <div className="page-section">Loading course details...</div>;

  return (
    <div className="d-flex flex-column gap-3">
      <section className="page-section">
        <div className="d-flex flex-wrap justify-content-between gap-3">
          <div>
            <span className="chip">{course.category}</span>
            <h2 className="mt-2">{course.title}</h2>
            <p className="text-muted mb-1">{course.description}</p>
            <p className="mb-1 small">
              <strong>Instructor:</strong> {course.instructor?.name}
            </p>
          </div>
          <div className="text-md-end">
            <p className="mb-3 fs-5 fw-semibold">PKR {Number(course.price).toLocaleString()}</p>
            {user?.role === 'student' ? (
              <button className="btn btn-brand" onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? 'Enrolling...' : 'Enroll in Course'}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <section className="page-section">
        <h4 className="section-heading">Lessons</h4>
        <p className="section-subtitle">Course content released by the instructor.</p>

        {course.lessons?.length ? (
          <div className="row g-3">
            {course.lessons.map((lesson, index) => (
              <div className="col-md-6" key={lesson._id}>
                <div className="panel-card card h-100">
                  <div className="card-body">
                    <p className="chip mb-2">Lesson {index + 1}</p>
                    <h6>{lesson.title}</h6>
                    <p className="text-muted mb-1">{lesson.content}</p>
                    {lesson.videoUrl ? (
                      <a href={lesson.videoUrl} target="_blank" rel="noreferrer">
                        Open video resource
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No lessons uploaded yet.</div>
        )}
      </section>
    </div>
  );
};

export default CourseDetailPage;
