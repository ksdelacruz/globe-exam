import { authCheck } from '../modules/api';

export const isAuthenticated = () => !!localStorage.getItem('accessToken');

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isLoggedIn = async () => {
  try {
    await authCheck();
    return true;
  } catch (err) {
    console.log('Not logged in');
    return false;
  }
};
