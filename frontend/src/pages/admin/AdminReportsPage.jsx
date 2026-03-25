import React, { useEffect, useState } from 'react';
import { getReports } from '../../services/courseService';

const AdminReportsPage = () => {
  const [reports, setReports] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      }
    };

    loadReports();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!reports) {
    return <div className="page-section">Loading reports...</div>;
  }

  const roleData = [
    { label: 'Students', value: reports.totalStudents, colorClass: 'tone-student' },
    { label: 'Instructors', value: reports.totalInstructors, colorClass: 'tone-instructor' },
    {
      label: 'Admins',
      value: Math.max(reports.totalUsers - reports.totalStudents - reports.totalInstructors, 0),
      colorClass: 'tone-admin'
    }
  ];

  const maxRoleValue = Math.max(...roleData.map((item) => item.value), 1);
  const enrollmentCapacity = Math.max(reports.totalCourses * 30, 1);
  const enrollmentPct = Math.min(Math.round((reports.totalEnrollments / enrollmentCapacity) * 100), 100);
  const avgRevenuePerEnrollment = reports.totalEnrollments
    ? Math.round(reports.totalRevenue / reports.totalEnrollments)
    : 0;

  return (
    <section className="page-section">
      <h2 className="section-heading">Reports / Analytics</h2>
      <p className="section-subtitle">Platform-level KPIs for admins.</p>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Users</h6>
            <h3>{reports.totalUsers}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Students</h6>
            <h3>{reports.totalStudents}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Instructors</h6>
            <h3>{reports.totalInstructors}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Courses</h6>
            <h3>{reports.totalCourses}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Enrollments</h6>
            <h3>{reports.totalEnrollments}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="course-card card p-3">
            <h6>Total Revenue</h6>
            <h3>PKR {Number(reports.totalRevenue).toLocaleString()}</h3>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="panel-card card p-3 h-100">
            <h5 className="mb-1">Role Distribution</h5>
            <p className="text-muted small mb-3">Visual share of active account types</p>
            <div className="d-flex flex-column gap-3">
              {roleData.map((item) => (
                <div key={item.label}>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="graph-track">
                    <div
                      className={`graph-fill ${item.colorClass}`}
                      style={{ width: `${Math.max((item.value / maxRoleValue) * 100, 6)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="panel-card card p-3 h-100">
            <h5 className="mb-1">Enrollment Capacity View</h5>
            <p className="text-muted small mb-3">Enrollment load against estimated platform capacity</p>
            <div
              className="donut-meter mb-3"
              style={{ '--pct': `${enrollmentPct}%` }}
              role="img"
              aria-label={`Enrollment capacity usage ${enrollmentPct} percent`}
            >
              <div>
                <strong>{enrollmentPct}%</strong>
                <p>used</p>
              </div>
            </div>
            <div className="insight-grid">
              <div>
                <span>Enrollments</span>
                <strong>{reports.totalEnrollments}</strong>
              </div>
              <div>
                <span>Avg Revenue / Enrollment</span>
                <strong>PKR {avgRevenuePerEnrollment.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReportsPage;
