import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { ROUTES } from './modules/routes';

import { isLoggedIn } from './services/auth';
import { ProductContextProvider } from './contexts/productContext';
import { UserContextProvider } from './contexts/userContext';

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn().then((res) => {
      setLoggedIn(res);
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#fafafa',
        }}
      >
        <CircularProgress size={80} thickness={5} />
        <span
          style={{
            marginTop: 32,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: 2,
            animation: 'pulse 1.5s infinite',
          }}
        >
          Loading...
        </span>
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to={ROUTES.DASHBOARD} />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            loggedIn ? (
              <ProductContextProvider>
                <UserContextProvider>
                  <Dashboard />
                </UserContextProvider>
              </ProductContextProvider>
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
