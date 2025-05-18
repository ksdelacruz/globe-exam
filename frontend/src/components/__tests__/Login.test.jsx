import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('renders username and password fields and login button', () => {
    render(
      <BrowserRouter>
        <Login onLogin={jest.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onLogin after successful login', async () => {
    // Mock loginUser API
    jest.spyOn(require('../../modules/api'), 'loginUser').mockResolvedValue({ data: { access_token: 'token', refresh_token: 'token' } });
    const onLogin = jest.fn();
    render(
      <BrowserRouter>
        <Login onLogin={onLogin} />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    // Wait for navigation and onLogin
    await screen.findByText(/Shop/i);
    expect(onLogin).toHaveBeenCalled();
  });
});
