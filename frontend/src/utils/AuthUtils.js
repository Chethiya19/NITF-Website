const USER_KEY = 'memberName';
const NIC_KEY = 'memberNic';

export const saveAuthData = (fullName, nic) => {
  localStorage.setItem(USER_KEY, fullName);
  localStorage.setItem(NIC_KEY, nic);
};

export const clearAuthData = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(NIC_KEY);
};

export const getMemberName = () => {
  return localStorage.getItem(USER_KEY);
};

export const getMemberNic = () => {
  return localStorage.getItem(NIC_KEY);
};

export const isAuthenticated = () => {
  return !!getMemberName() && !!getMemberNic();
};
