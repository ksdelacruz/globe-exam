import React, { useCallback, useMemo, useState } from 'react';
import api from '../services/api';
import { API_ROUTES } from '../modules/constants';

export const ProductContext = React.createContext(undefined);

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getCartFromDb = useCallback((rows) => {
    setCart(rows);
  }, []);

  const addToCartAPI = (id) => {
    api.post(API_ROUTES.CART_ADD, { product_id: id }).then((res) => {
      setCart((prev) => [...prev, res.data]);
    });
  };

  const addToCart = useCallback((id) => addToCartAPI(id), []);
  const removeFromCart = useCallback((id) => {
    api.post(API_ROUTES.CART_REMOVE, { product_id: id }).then(() => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      products,
      setProducts,
      addToCart,
      getCartFromDb,
      removeFromCart,
    }),
    [products, setProducts, cart, addToCart, getCartFromDb, removeFromCart]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
