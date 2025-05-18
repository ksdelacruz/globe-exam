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
import { ProductContext } from '../../contexts/productContext';

import { fetchProducts } from '../../modules/api';

const ProductList = () => {
  const { products, cart, addToCart, setProducts } = useContext(ProductContext);

  const [loadingProducts, setLoadingProducts] = React.useState(true);

  useEffect(() => {
    setLoadingProducts(true);
    fetchProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoadingProducts(false));
  }, [setProducts]);

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
        Product List
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingProducts ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress color="primary" size={32} />
                </TableCell>
              </TableRow>
            ) : products.filter((product) => !cart.includes(product.id))
                .length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">
                    No products available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                if (cart.find((item) => item.id === product.id)) return null;
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => addToCart(product.id)}
                      >
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductList;
