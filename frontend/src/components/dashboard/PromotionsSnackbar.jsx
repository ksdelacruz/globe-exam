import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  connectPromotionsWebSocket,
  disconnectPromotionsWebSocket,
} from '../../services/websocket';

const PromotionsSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const socket = connectPromotionsWebSocket();
    socket.on('promotion', (data) => {
      enqueueSnackbar(data.message, {
        variant: 'info',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        autoHideDuration: 10000,
      });
    });
    return () => {
      socket.off('promotion');
      disconnectPromotionsWebSocket();
    };
  }, [enqueueSnackbar]);

  return null;
};

export default PromotionsSnackbar;
