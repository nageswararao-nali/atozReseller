import { AUTH, AUTH_REGISTER, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  isTokenLoading: true,
  accessToken: null,
  mobile: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH:
      return { ...state, ...payload, isLoading: true, isTokenLoading: true };
    case `${AUTH}_${SUCCESS}`:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        isTokenLoading: false,
        accessToken: payload.accessToken,
        mobile: payload.mobile
      };
    case `${AUTH}_${FAIL}`:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        isTokenLoading: true,
        accessToken: null,
      };
    case AUTH_REGISTER:
      return { ...state, ...payload, isLoading: true};
    case `${AUTH_REGISTER}_${SUCCESS}`:
      return {
        ...state,
        isLoading: false
      };
    case `${AUTH_REGISTER}_${FAIL}`:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
