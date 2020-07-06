import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  COUNT_ITEMS,
  UPDATE_TOTAL,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case COUNT_ITEMS:
      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload.id ? (prod = action.payload) : prod
        ),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce(
          (newToal, prod) => (newToal += prod.price * prod.quantity),
          0
        ),
      };
    default:
      return state;
  }
};
