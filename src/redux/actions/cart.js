import { UPDATE_PRODUCT_CART, CLEAR_CART } from '@redux/action-types';

export const updateProductCart = (categoryId, productId, itemId, value, categoryName, productName, itemName, price) => (dispatch) => {
  dispatch({
    type: `${UPDATE_PRODUCT_CART}`,
    payload: {categoryId, productId, itemId, value, categoryName, productName, itemName, price},
  });
  return Promise.resolve({});
}
export const clearCart = () => (dispatch) => {
  dispatch({
    type: `${CLEAR_CART}`,
    payload: {},
  });
  dispatch({
    type: `${CLEAR_ORDER}`,
    payload: {},
  });
  return Promise.resolve({});
}