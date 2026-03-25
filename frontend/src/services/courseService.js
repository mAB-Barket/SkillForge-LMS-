import api from './api';

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (payload) => {
  const response = await api.post('/courses', payload);
  return response.data;
};

export const updateCourse = async (id, payload) => {
  const response = await api.put(`/courses/${id}`, payload);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const uploadLesson = async (courseId, payload) => {
  const response = await api.post(`/courses/${courseId}/lessons`, payload);
  return response.data;
};

export const enrollInCourse = async (courseId) => {
  const response = await api.post('/enrollments/enroll', { courseId });
  return response.data;
};

export const getMyCourses = async () => {
  const response = await api.get('/enrollments/my-courses');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getReports = async () => {
  const response = await api.get('/analytics/reports');
  return response.data;
};
