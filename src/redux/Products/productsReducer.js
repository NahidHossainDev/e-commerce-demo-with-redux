import * as actionType from "./productsTypes";

const initialState = {
    loading: false,
    product: [],
    error: "",
}

export const getProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionType.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }
        case actionType.GET_PRODUCTS_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
        default:
            return state
    }
}

export const getProductDetailReducer = (state = {productDetail:{}}, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case actionType.GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};