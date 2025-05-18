import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const ChangePasswordDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    changePwdDialogOpen,
    setChangePwdDialogOpen,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    changePwdError,
    setChangePwdError,
    changePwdLoading,
    showPwdSuccess,
    setShowPwdSuccess,
    handleChangePassword,
  } = useContext(UserContext);

 useEffect(() => {
    if (showPwdSuccess) {
      enqueueSnackbar('Password changed successfully!', {
        variant: 'success',
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        autoHideDuration: 5000,
      });
      setShowPwdSuccess(false);
    }
  }, [showPwdSuccess, enqueueSnackbar, setShowPwdSuccess]);

  const handleClose = () => {
    setChangePwdDialogOpen(false);
    setChangePwdError('');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <>
      <Dialog open={changePwdDialogOpen} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!changePwdError}
            autoFocus
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {changePwdError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {changePwdError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={changePwdLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={changePwdLoading}
            onClick={handleChangePassword}
          >
            {changePwdLoading ? <CircularProgress size={20} /> : 'Apply'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
