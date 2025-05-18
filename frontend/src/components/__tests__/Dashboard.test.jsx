import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { UserContext } from '../../contexts/userContext';
import { ProductContext } from '../../contexts/productContext';

// Mock contexts and dependencies
const mockUserContext = {
  logout: jest.fn(),
  currentUser: { email: 'test@example.com' },
  setCurrentUser: jest.fn(),
  setChangePwdDialogOpen: jest.fn(),
};
const mockProductContext = {};

jest.mock('../dashboard/Cart', () => {
  const CartMock = () => <div>CartMock</div>;
  CartMock.displayName = 'CartMock';
  return CartMock;
});
jest.mock('../dashboard/ProductList', () => {
  const ProductListMock = () => <div>ProductListMock</div>;
  ProductListMock.displayName = 'ProductListMock';
  return ProductListMock;
});
jest.mock('../dashboard/ChangePasswordDialog', () => {
  const ChangePasswordDialogMock = () => <div>ChangePasswordDialogMock</div>;
  ChangePasswordDialogMock.displayName = 'ChangePasswordDialogMock';
  return ChangePasswordDialogMock;
});
jest.mock('../dashboard/PromotionsSnackbar', () => {
  const PromotionsSnackbarMock = () => <div>PromotionsSnackbarMock</div>;
  PromotionsSnackbarMock.displayName = 'PromotionsSnackbarMock';
  return PromotionsSnackbarMock;
});

// Suppress notistack warning
jest.mock('notistack', () => ({ SnackbarProvider: ({ children }) => <div>{children}</div>, useSnackbar: () => ({ enqueueSnackbar: jest.fn() }) }));

describe('Dashboard', () => {
  it('renders the Shop title and user email', () => {
    render(
      <ProductContext.Provider value={mockProductContext}>
        <UserContext.Provider value={mockUserContext}>
          <Dashboard />
        </UserContext.Provider>
      </ProductContext.Provider>
    );
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
});
