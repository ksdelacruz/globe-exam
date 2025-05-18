import React, { useState } from 'react';
import { loginUser } from '../modules/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../modules/routes';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('refreshToken', res.data.refresh_token);
      navigate(ROUTES.DASHBOARD);
      onLogin();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={6} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Shop
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            {`Don't have an account? `}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate(ROUTES.SIGNUP)}
              sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
            >
              Signup here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
