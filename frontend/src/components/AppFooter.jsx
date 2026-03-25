import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glass">
      <div className="container footer-top">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">SkillForge LMS</div>
            <p className="footer-copy">
              A complete learning platform for students, instructors, and admins with role-based
              workflows and analytics.
            </p>
            <div className="footer-badges">
              <span>Secure Auth</span>
              <span>Role Dashboards</span>
              <span>Analytics Ready</span>
            </div>
          </div>

          <div>
            <h6 className="footer-heading">Quick Links</h6>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <div>
            <h6 className="footer-heading">Role Paths</h6>
            <div className="footer-links">
              <Link to="/student/my-courses">Student Space</Link>
              <Link to="/instructor/manage-courses">Instructor Space</Link>
              <Link to="/admin/reports">Admin Reports</Link>
              <Link to="/register">Create Account</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0 small">© {year} SkillForge LMS. All rights reserved.</p>
          <p className="mb-0 small">Built with MERN stack for academic and real-world workflows.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
