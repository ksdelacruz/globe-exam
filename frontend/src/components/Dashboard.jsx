import React, { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { UserContext } from '../contexts/userContext';
import { fetchDashboard } from '../modules/api';
import { ROUTES } from '../modules/routes';

import Cart from './dashboard/Cart';
import ProductList from './dashboard/ProductList';
import ChangePasswordDialog from './dashboard/ChangePasswordDialog';
import PromotionsSnackbar from './dashboard/PromotionsSnackbar';
import { SnackbarProvider } from 'notistack';

import userIcon from '../images/user-icon.png';

function Dashboard() {
  const { logout, currentUser, setCurrentUser, setChangePwdDialogOpen } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [loadingUser, setLoadingUser] = React.useState(true);

  // Profile menu/dialog state
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    setLoadingUser(true);
    fetchDashboard()
      .then((res) => setCurrentUser(res.data))
      .catch(() => {
        navigate(ROUTES.LOGIN);
      })
      .finally(() => setLoadingUser(false));
  }, [navigate, setCurrentUser]);

  return (
    <Box bgcolor="#f5f5f5" minHeight="auto" p={3}>
      {loadingUser ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30vh"
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : (
        <>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              mb: 4,
              width: 'auto',
              mx: 'auto',
            }}
          >
            <Typography variant="h4" fontWeight={700} color="primary.main">
              Shop
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                avatar={
                  <Avatar
                    sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}
                    src={userIcon}
                    alt="User Avatar"
                  />
                }
                label={
                  <Typography fontWeight="bold" component="span">
                    {currentUser?.username || ''}
                  </Typography>
                }
                color="success"
                clickable
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: { minWidth: 260, p: 2 },
                }}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {currentUser?.email || ''}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Last login:</strong> {currentUser?.last_login ? new Date(currentUser.last_login).toLocaleString() : ''}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ p: 0, minHeight: 0, minWidth: 0, textTransform: 'none' }}
                  onClick={() => {
                    setChangePwdDialogOpen(true);
                    setAnchorEl(null);
                  }}
                >
                  Change password
                </Button>
              </Menu>
              <Button
                variant="outlined"
                color="secondary"
                onClick={logout}
                sx={{ fontWeight: 600 }}
              >
                Logout
              </Button>
            </Stack>
          </Paper>

          <SnackbarProvider maxSnack={5} preventDuplicate anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <ChangePasswordDialog />
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems="flex-start"
              justifyContent="center"
              gap={4}
              width="auto"
              mx="auto"
            >
              <Box flex={2} width={{ xs: '100%', md: '50%' }}>
                <ProductList />
              </Box>
              <Box flex={1} width={{ xs: '100%', md: '50%' }}>
                <Cart />
              </Box>
              <PromotionsSnackbar />
            </Box>
          </SnackbarProvider>
        </>
      )}
    </Box>
  );
}

export default Dashboard;
