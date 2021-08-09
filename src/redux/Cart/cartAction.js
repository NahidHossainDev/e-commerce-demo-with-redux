import axios from "axios";
import * as action_types from './cartTypes';

export const addToCart = (id) => async (dispatch, getState) => {
  const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
  dispatch({
    type: action_types.ADD_TO_CART,
    payload: {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
      quantity: 1,
    },
  });

  sessionStorage.setItem("cart", JSON.stringify(getState().cart.cartItem));
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: action_types.REMOVE_FROM_CART,
    payload: {
      id,
    }
  })

  sessionStorage.setItem("cart", JSON.stringify(getState().cart.cartItem));
};

export const adjustQuantity = (id, quantity) => (dispatch, getState)=> {
  dispatch( {
    type: action_types.ADJUST_QUANTITY,
    payload: {
      id,
      quantity,
    },
  })

  sessionStorage.setItem("cart", JSON.stringify(getState().cart.cartItem));
};

export const resetCart = () => (dispatch)=> {
  dispatch( {
    type: action_types.RESET_CART,
  })

  sessionStorage.removeItem("cart");
};