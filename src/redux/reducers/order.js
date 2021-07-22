import { GET_ORDER, BOOK_ORDER, CLEAR_ORDER, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: false,
  orderInfo: {},
  orderDocumentUrl: '',
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDER:
      return { ...state, isLoading: true };
    case `${GET_ORDER}_${SUCCESS}`:
      console.log("order deatils payload", payload)
      return {
        ...state,
        isLoading: false,
        routes: payload.data
      };
    case `${GET_ORDER}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    
    case BOOK_ORDER:
      return { ...state, isLoading: true };
    case `${BOOK_ORDER}_${SUCCESS}`:
      console.log("close order payload", payload)
      if(payload.success) {
        return {
          ...state,
          isLoading: false,
          orderDocumentUrl: payload.pdfurl
        };  
      } else {
        return { ...state, isLoading: false, error: payload.message };
      }
      
    case `${BOOK_ORDER}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    case `${CLEAR_ORDER}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, orderDocumentUrl: '', error: null };
    
    default:
      return state;
  }
};
