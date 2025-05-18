import React, { useCallback, useMemo, useState } from 'react';
import api from '../services/api';
import { API_ROUTES } from '../modules/constants';
import { ROUTES } from '../modules/routes';
import { useNavigate } from 'react-router-dom';
import { changePassword as changePasswordApi } from '../modules/api';

export const UserContext = React.createContext(undefined);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = React.useState([]);

  // Change password dialog state
  const [changePwdDialogOpen, setChangePwdDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePwdError, setChangePwdError] = useState('');
  const [changePwdLoading, setChangePwdLoading] = useState(false);
  const [showPwdSuccess, setShowPwdSuccess] = useState(false);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    api.post(API_ROUTES.LOGOUT).then(() => {
      setCurrentUser(null);
      navigate(ROUTES.LOGIN);
    });
  }, [navigate]);

  // Handler for applying password change
  const handleChangePassword = useCallback(async () => {
    setChangePwdError('');
    setChangePwdLoading(true);
    try {
      await changePasswordApi(oldPassword, newPassword);
      setChangePwdDialogOpen(false);
      setOldPassword('');
      setNewPassword('');
      setShowPwdSuccess(true);
    } catch (err) {
      setChangePwdError(
        err?.response?.data?.msg || 'Failed to change password.'
      );
    } finally {
      setChangePwdLoading(false);
    }
  }, [oldPassword, newPassword]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
      currentUser,
      setCurrentUser,
      logout,
      // Change password dialog state/logic
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
    }),
    [
      users,
      setUsers,
      currentUser,
      setCurrentUser,
      logout,
      changePwdDialogOpen,
      oldPassword,
      newPassword,
      changePwdError,
      changePwdLoading,
      showPwdSuccess,
      handleChangePassword,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
