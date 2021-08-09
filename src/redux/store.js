import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { cartReducer } from "./Cart/cartReducer";
import { userLoginReducer, adminLoginReducer } from "./Login/loginReducer";
import { getProductsReducer, getProductDetailReducer } from "./Products/productsReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  allProducts: getProductsReducer,
  productDetail: getProductDetailReducer,
  userLoginData: userLoginReducer,
  adminLoginData: adminLoginReducer,
});

const storageCart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : []
const userFrmStorage = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : {isLogin:false,}
const adminFrmStorage = sessionStorage.getItem("adminData") ? JSON.parse(sessionStorage.getItem("adminData")) : {isLogin:false,}

const initialStore = {
  cartItem: storageCart,
  userLoginData: userFrmStorage,
  adminLoginData: adminFrmStorage,
};

const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;