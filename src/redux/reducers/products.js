import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_SUB_CATEGORIES_PRODUCTS, UPDATE_PRODUCT_CART, CLEAR_CART, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  products: [],
  categoryProducts: [],
  cartData: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, isLoading: true };
    case `${GET_PRODUCTS}_${SUCCESS}`:
      // console.log("product payload")
      // console.log(payload)
      return {
        ...state,
        isLoading: false,
        products: payload.results,
      };
    case `${GET_PRODUCTS}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case GET_SUB_CATEGORIES_PRODUCTS:
      return { ...state, isLoading: true };
    case `${GET_SUB_CATEGORIES_PRODUCTS}_${SUCCESS}`:
      console.log("cat products payload")
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        categoryProducts: payload.results,
      };
    case `${GET_SUB_CATEGORIES_PRODUCTS}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

      


    case ADD_PRODUCT:
      return { ...state, isLoading: true };

    case `${ADD_PRODUCT}_${SUCCESS}`:
      // console.log("product payload")
      // console.log(payload)
      const prevState = {...state}
      // console.log(prevState)
      if(payload.id) {
        prevState['products'].unshift(payload) 
        prevState['error'] = null
      } else {
        prevState['error'] = 'problem in adding product'
      }
      prevState['isLoading'] = false
      return prevState;

    case `${ADD_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case UPDATE_PRODUCT:
      return { ...state, isLoading: true };

    case `${UPDATE_PRODUCT}_${SUCCESS}`:
    // console.log("items payload after add item")
    // console.log(payload)
      let productsData = state.products.filter((product) => {
        if(product.id == payload.id) {
          Object.assign(product, payload)
        }
        return product
      })
      return {
        ...state,
        isLoading: false,
        products: productsData,
      };

    case `${UPDATE_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case DELETE_PRODUCT:
      return { ...state, isLoading: true };

    case `${DELETE_PRODUCT}_${SUCCESS}`:
    console.log("delete products payload after add product")
    console.log(payload)
      let products = state.products.filter((product) => {
        if(product.id != payload) {
          return product
        }
      })
      return {
        ...state,
        isLoading: false,
        products: products,
      };

    case `${DELETE_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };
      
    case `${UPDATE_PRODUCT_CART}`:
    console.log("items payload after add item")
    console.log(payload)
    let cartProductsData = state.categoryProducts.filter((categoryData) => {
      if(categoryData.id == payload.categoryId) {
        categoryData.products.filter((product) => {
          if(product.id == payload.productId) {
            product.items.filter((item) => {
              if(item.item.id == payload.itemId) {
                item.value = payload.value
              }
              return item
            })
          }
          return product
        })
        return categoryData
      }else {
        return categoryData
      }
      
    })
    let cartData = state.cartData
    let cIndex = cartData.findIndex(x => x.itemId == payload.itemId && x.productId == payload.productId)
    if(cIndex >= 0) {
      cartData[cIndex] = payload
    } else {
      cartData.push(payload)
    }
    
    const cartData1 = JSON.parse(JSON.stringify(cartData))
      
      // console.log(payload)
      /*console.log("cartProductsData")
      cartProductsData.map((c) => {
        c.products.map((p) => {
          // console.log(p)
          p.items.map((i)=> {
            console.log(i)
          })
        })
      })*/
      return {
        ...state,
        isLoading: false,
        categoryProducts: cartProductsData,
        cartData: cartData1
      };
     
    case CLEAR_CART:
      return { ...state, isLoading: false, categoryProducts: [], cartData: [] };

    default:
      return state;
  }
};
