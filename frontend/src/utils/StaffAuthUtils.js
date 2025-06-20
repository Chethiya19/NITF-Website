const STAFF_NAME_KEY = 'staffName';
const STAFF_NIC_KEY = 'staffNic';

export const saveAuthData = (fullName, nic) => {
  localStorage.setItem(STAFF_NAME_KEY, fullName);
  localStorage.setItem(STAFF_NIC_KEY, nic);
};

export const clearAuthData = () => {
  localStorage.removeItem(STAFF_NAME_KEY);
  localStorage.removeItem(STAFF_NIC_KEY);
};

export const getStaffName = () => {
  return localStorage.getItem(STAFF_NAME_KEY);
};

export const getStaffNic = () => {
  return localStorage.getItem(STAFF_NIC_KEY);
};

export const isAuthenticated = () => {
  return !!getStaffName() && !!getStaffNic();
};
