import * as actionTypes from "./cartTypes";

const initialState = {
    cartItem: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_CART:
        const item = action.payload;
        console.log(action.payload)
        const existItem = state.cartItem.find((d) => d.id === item.id);

        if (existItem) {
          return state;
        } else {
          return {
            ...state,
            cartItem: [...state.cartItem, item],
          };
        }

      case actionTypes.REMOVE_FROM_CART:
        return {
          ...state,
          cartItem: state.cartItem.filter((d) => d.id !== action.payload.id),
        };

      case actionTypes.ADJUST_QUANTITY:
        const newCart = [...state.cartItem];
        newCart.forEach((d) => {
          if (d.id === action.payload.id) {
            d.quantity = action.payload.quantity;
          }
        });
        return {
          ...state,
          cartItem: newCart,
        };
        
      case actionTypes.RESET_CART:
        return {
            ...state,
            cartItem:[]
          }

      default:
        return state;
    }
}