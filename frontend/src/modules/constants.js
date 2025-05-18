export const API_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CART_GET: (userId) => `/cart/get/${userId}`,
  CART_ADD: '/cart/add',
  CART_REMOVE: '/cart/remove',
  LOGOUT: '/logout',
  CHANGE_PASSWORD: '/change-password',
  AUTH_CHECK: '/auth/check',
};
