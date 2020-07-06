import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  COUNT_ITEMS,
  UPDATE_TOTAL,
} from '../../types';
import OrderReducer from './OrderReducer';

const OrderState = ({ children }) => {
  const INITIAL_STATE = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };
  const addProduct = (prod) => {
    let newState;

    if (state.products.length > 0 && prod) {
      newState = prod.map((product) => {
        const newObj = state.products.find(
          (prodState) => prodState.id === product.id
        );
        return {
          ...product,
          ...newObj,
        };
      });
    } else {
      newState = prod;
    }
    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  const productQuantity = (newProduct) =>
    dispatch({
      type: COUNT_ITEMS,
      payload: newProduct,
    });

  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        productQuantity,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
