import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password must match');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="form-shell">
          <h2 className="section-heading">Create Your Account</h2>
          <p className="section-subtitle">Join as a student or instructor and start using the LMS.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" type="text" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" type="email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                className="form-control"
                name="password"
                type={showPassword ? 'text' : 'password'}
                minLength={6}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-eye"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 3L21 21M9.9 9.9A3 3 0 0014.1 14.1M6.7 6.7C4.7 8 3.3 10 2.5 12c1.4 3.4 4.8 6.5 9.5 6.5 2 0 3.8-.6 5.3-1.6M10.6 5.6A10 10 0 0112 5.5c4.7 0 8.1 3.1 9.5 6.5a11.2 11.2 0 01-2.4 3.6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 12C3.9 8.6 7.3 5.5 12 5.5S20.1 8.6 21.5 12c-1.4 3.4-4.8 6.5-9.5 6.5S3.9 15.4 2.5 12z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                className="form-control"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                minLength={6}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-eye"
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 3L21 21M9.9 9.9A3 3 0 0014.1 14.1M6.7 6.7C4.7 8 3.3 10 2.5 12c1.4 3.4 4.8 6.5 9.5 6.5 2 0 3.8-.6 5.3-1.6M10.6 5.6A10 10 0 0112 5.5c4.7 0 8.1 3.1 9.5 6.5a11.2 11.2 0 01-2.4 3.6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 12C3.9 8.6 7.3 5.5 12 5.5S20.1 8.6 21.5 12c-1.4 3.4-4.8 6.5-9.5 6.5S3.9 15.4 2.5 12z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Register As</label>
            <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button className="btn btn-brand w-100" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
