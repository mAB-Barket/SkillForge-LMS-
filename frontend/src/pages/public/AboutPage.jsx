import React from 'react';

const AboutPage = () => {
  return (
    <section className="page-section">
      <h2 className="section-heading">About This LMS</h2>
      <p className="section-subtitle">
        Built for real-world MERN workflows with modular architecture, secure auth, and role-based
        experiences.
      </p>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="panel-card card h-100">
            <div className="card-body">
              <h5>Tech Architecture</h5>
              <p className="text-muted mb-0">
                React + React Router on the frontend, Node.js + Express APIs on the backend,
                MongoDB + Mongoose for data modeling, and Axios for API communication.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel-card card h-100">
            <div className="card-body">
              <h5>Security</h5>
              <p className="text-muted mb-0">
                Password hashing with Bcrypt, JWT-based authentication, protected endpoints, and
                role-based access control middleware.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel-card card h-100">
            <div className="card-body">
              <h5>Instructor Flow</h5>
              <p className="text-muted mb-0">
                Instructors can create courses, manage updates, and upload structured lessons with
                optional video links.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel-card card h-100">
            <div className="card-body">
              <h5>Admin Oversight</h5>
              <p className="text-muted mb-0">
                Admin users can manage platform users/courses and monitor reports including
                enrollments and revenue metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
