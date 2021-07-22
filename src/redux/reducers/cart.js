import { UPDATE_PRODUCT_CART, CLEAR_CART } from '@redux/action-types';

const initialState = {
  cartData: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
      return { ...state, cartData: [] };

    default:
      return state;
  }
};
