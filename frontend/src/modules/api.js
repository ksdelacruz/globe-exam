import api from '../services/api';
import { API_ROUTES } from './constants';

export const authCheck = () => api.get(API_ROUTES.AUTH_CHECK);
export const loginUser = (form) => api.post(API_ROUTES.LOGIN, form);
export const signupUser = (form) => api.post(API_ROUTES.SIGNUP, form);
export const fetchDashboard = () => api.get(API_ROUTES.DASHBOARD);
export const fetchProducts = () => api.get(API_ROUTES.PRODUCTS);
export const fetchCart = (userId) => api.get(API_ROUTES.CART_GET(userId));
export const changePassword = (old_password, new_password) =>
  api.post(API_ROUTES.CHANGE_PASSWORD, { old_password, new_password });
