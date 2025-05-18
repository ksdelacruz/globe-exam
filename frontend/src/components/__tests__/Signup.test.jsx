import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../Signup';
import { BrowserRouter } from 'react-router-dom';

describe('Signup', () => {
  it('renders signup form fields', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });
});
