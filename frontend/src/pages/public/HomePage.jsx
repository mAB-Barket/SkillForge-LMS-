import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-4">
      <section className="hero">
        <div className="row align-items-center g-4 position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold mb-3">SkillForge: Train smarter, teach better.</h1>
            <p className="lead mb-4">
              A complete MERN Learning Management System with secure authentication, role-based
              dashboards, and course workflows for students, instructors, and admins.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-light fw-semibold px-4" to="/courses">
                Explore Courses
              </Link>
              <Link className="btn btn-outline-light px-4" to="/register">
                Start Learning
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row g-2">
              <div className="col-6">
                <div className="metric-card">
                  <p className="mb-1 text-muted">Roles</p>
                  <p className="metric-value mb-0">3</p>
                </div>
              </div>
              <div className="col-6">
                <div className="metric-card">
                  <p className="mb-1 text-muted">Core APIs</p>
                  <p className="metric-value mb-0">10+</p>
                </div>
              </div>
              <div className="col-12">
                <div className="metric-card">
                  <p className="mb-1 text-muted">Security Stack</p>
                  <p className="mb-0 fw-semibold">JWT, Bcrypt, Protected Routes, RBAC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="panel-card card h-100">
              <div className="card-body">
                <span className="chip mb-2">Student</span>
                <h5>Learning Dashboard</h5>
                <p className="mb-0 text-muted">
                  Register, browse courses, enroll, and monitor progress through your personalized
                  course list.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-card card h-100">
              <div className="card-body">
                <span className="chip mb-2">Instructor</span>
                <h5>Course Studio</h5>
                <p className="mb-0 text-muted">
                  Create rich courses, edit content, upload lessons, and manage your offerings from
                  one place.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-card card h-100">
              <div className="card-body">
                <span className="chip mb-2">Admin</span>
                <h5>Operations Control</h5>
                <p className="mb-0 text-muted">
                  Manage users and courses, track enrollments, and view platform-wide analytics and
                  revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <h5 className="mb-1">Weekly Learning Pulse</h5>
            <p className="text-muted small mb-3">A visual preview panel to make dashboards feel alive.</p>
            <div className="mini-bar-chart">
              {[52, 74, 68, 83, 91, 78, 96].map((value, index) => (
                <div className="mini-bar-col" key={index}>
                  <div className="mini-bar" style={{ height: `${value}%` }} />
                  <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <h5 className="mb-1">Platform Journey View</h5>
            <p className="text-muted small mb-3">From signup to course completion in one flow.</p>
            <div className="journey-list">
              <div className="journey-item">
                <strong>1. Register</strong>
                <p>Choose student or instructor role and create your account.</p>
              </div>
              <div className="journey-item">
                <strong>2. Discover & Build</strong>
                <p>Students enroll in courses, instructors publish high-value lessons.</p>
              </div>
              <div className="journey-item">
                <strong>3. Track Outcomes</strong>
                <p>Admins monitor growth, revenue, and engagement through insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
