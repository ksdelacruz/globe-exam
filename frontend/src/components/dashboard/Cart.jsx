import React, { useContext, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { ProductContext } from '../../contexts/productContext';
import { UserContext } from '../../contexts/userContext';
import { fetchCart } from '../../modules/api';

import informationIcon from '../../images/information-icon.png';

const Cart = () => {
  const { currentUser } = useContext(UserContext);
  const { cart, removeFromCart, getCartFromDb } = useContext(ProductContext);

  const [loadingCart, setLoadingCart] = React.useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      setLoadingCart(true);
      fetchCart(currentUser.id)
        .then((res) => {
          getCartFromDb(res.data);
        })
        .finally(() => setLoadingCart(false));
    }
  }, [getCartFromDb, currentUser?.id]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        width: 'auto',
        height: 'calc(100vh - 210px)',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
              <TableCell>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Price</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingCart ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress color="primary" size={32} />
                </TableCell>
              </TableRow>
            ) : cart.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">Cart is empty</Typography>
                </TableCell>
              </TableRow>
            ) : (
              cart.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Tooltip title={product.checkout_date}>
                        <div style={{ display: 'inline-block' }}>
                          <Avatar
                            src={informationIcon}
                            alt="informationIcon"
                            sx={{ width: 24, height: 24 }}
                          />
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right">
                <Typography fontWeight="bold">Total:</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">
                  $
                  {cart
                    .reduce((sum, item) => sum + (item.price || 0), 0)
                    .toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Cart;
