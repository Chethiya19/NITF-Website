// utils/adminAuthUtils.js

export const isAdminAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const getAdminName = () => {
  return localStorage.getItem('adminName') || '';
};

export const clearAdminAuthData = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
};
