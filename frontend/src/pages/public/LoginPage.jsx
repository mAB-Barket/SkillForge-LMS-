import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(formData);
      if (data.user.role === 'student') navigate('/student/my-courses');
      if (data.user.role === 'instructor') navigate('/instructor/manage-courses');
      if (data.user.role === 'admin') navigate('/admin/reports');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="form-shell">
          <h2 className="section-heading">Welcome Back</h2>
          <p className="section-subtitle">Login to continue to your LMS dashboard.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <button className="btn btn-brand w-100" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
