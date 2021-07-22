import { GET_PRODUCTS, GET_SUB_CATEGORIES_PRODUCTS, UPDATE_PRODUCT_CART, CLEAR_CART, CLEAR_ORDER, SUCCESS, FAIL } from '@redux/action-types';

export const getProducts = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: GET_PRODUCTS,
    payload: {
      request: {
        url: '/v1/product',
        method: 'GET',
        params,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const {
            data: { data: products },
          } = response;
          dispatch({
            type: `${GET_PRODUCTS}_${SUCCESS}`,
            payload: products,
          });
          return Promise.resolve(products);
        },
        onError: (exception) => {
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_PRODUCTS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_PRODUCTS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const getSubCategoriesProducts = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "token")
  // console.log('/v1/category?isCategory=false', "url")
  return dispatch({
    type: GET_SUB_CATEGORIES_PRODUCTS,
    payload: {
      request: {
        url: '/v1/category/get-all',
        method: 'GET',
        params,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          console.log(response)
          const { data } = response;
          dispatch({
            type: `${GET_SUB_CATEGORIES_PRODUCTS}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_SUB_CATEGORIES_PRODUCTS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_SUB_CATEGORIES_PRODUCTS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};
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

