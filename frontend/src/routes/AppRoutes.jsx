import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CourseListPage from '../pages/public/CourseListPage';
import CourseDetailPage from '../pages/public/CourseDetailPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import StudentMyCoursesPage from '../pages/student/StudentMyCoursesPage';
import StudentProfilePage from '../pages/student/StudentProfilePage';
import InstructorCreateCoursePage from '../pages/instructor/InstructorCreateCoursePage';
import InstructorManageCoursesPage from '../pages/instructor/InstructorManageCoursesPage';
import InstructorUploadLessonsPage from '../pages/instructor/InstructorUploadLessonsPage';
import AdminManageUsersPage from '../pages/admin/AdminManageUsersPage';
import AdminManageCoursesPage from '../pages/admin/AdminManageCoursesPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/student/my-courses"
        element={
          <ProtectedRoute roles={['student']}>
            <StudentMyCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute roles={['student']}>
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor/create-course"
        element={
          <ProtectedRoute roles={['instructor']}>
            <InstructorCreateCoursePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/manage-courses"
        element={
          <ProtectedRoute roles={['instructor']}>
            <InstructorManageCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/upload-lessons"
        element={
          <ProtectedRoute roles={['instructor']}>
            <InstructorUploadLessonsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminManageUsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-courses"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminManageCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
