import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="page-section">
      <h2 className="section-heading">My Profile</h2>
      <p className="section-subtitle">Your personal account information and role details.</p>
      <div className="course-card card">
        <div className="card-body">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="mb-0">
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentProfilePage;
