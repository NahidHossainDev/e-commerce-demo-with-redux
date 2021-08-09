import * as actionType from "./productsTypes";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionType.GET_PRODUCTS_REQUEST });

        const {data} = await axios.get("https://fakestoreapi.com/products/");
        dispatch({
          type: actionType.GET_PRODUCTS_SUCCESS,
          payload: data,
        });

    } catch (error) {
        dispatch({
          type: actionType.GET_PRODUCTS_FAIL,
          payload:
            error.response && error.response.data.massage
              ? error.response.data.massage
              : error.massage,
        });
    }
   
}

export const getProductDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch({
      type: actionType.GET_PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.massage
          : error.massage,
    });
  }
};

export const removeProductDetail = () => (dispatch) => {
    dispatch({
        type:actionType.GET_PRODUCT_DETAIL_RESET
    })
}