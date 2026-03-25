import React, { useState } from 'react';
import { createCourse } from '../../services/courseService';

const InstructorCreateCoursePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createCourse(formData);
      setMessage(data.message);
      setError('');
      setFormData({ title: '', description: '', category: '', price: 0 });
    } catch (err) {
      setError(err.response?.data?.message || 'Course creation failed');
      setMessage('');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="form-shell">
          <h2 className="section-heading">Create Course</h2>
          <p className="section-subtitle">Publish a new course with category and pricing details.</p>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (PKR)</label>
            <input
              className="form-control"
              name="price"
              type="number"
              min={0}
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-brand" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default InstructorCreateCoursePage;
