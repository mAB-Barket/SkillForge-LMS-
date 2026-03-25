import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = ['all', ...new Set(courses.map((course) => course.category))];
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="d-flex flex-column gap-3">
      <section className="page-section">
        <h2 className="section-heading">Course Listing</h2>
        <p className="section-subtitle">
          Discover curated programs by instructors and filter by interest.
        </p>

        <div className="row g-2">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Search by title or keyword"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'All Categories' : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? <div className="page-section">Loading courses...</div> : null}

      <div className="row g-3">
        {filteredCourses.map((course) => (
          <div className="col-md-6 col-xl-4" key={course._id}>
            <div className="course-card card h-100">
              <div className="card-body">
                <span className="chip mb-2">{course.category}</span>
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-muted">{course.description.slice(0, 110)}...</p>
                <p className="mb-1 small">
                  <strong>Category:</strong> {course.category}
                </p>
                <p className="mb-1 small">
                  <strong>Instructor:</strong> {course.instructor?.name}
                </p>
                <p className="mb-3">
                  <strong>Price:</strong> PKR {Number(course.price).toLocaleString()}
                </p>
                <Link to={`/courses/${course._id}`} className="btn btn-brand">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredCourses.length === 0 ? (
          <div className="col-12">
            <div className="empty-state">No courses match your filter yet.</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseListPage;
