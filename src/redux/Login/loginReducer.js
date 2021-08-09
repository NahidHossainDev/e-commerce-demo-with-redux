import * as actionType from "./loginTypes";


export const userLoginReducer = (state = { isLogin: false }, action) => {
  switch (action.type) {
    case actionType.USER_SIGN_IN:
      return {
        isLogin: true,
        userName: action.payload.userName,
        phoneNumber: action.payload.phoneNumber,
      };

    case actionType.USER_SIGN_OUT:
      delete state.userName;
      delete state.phoneNumber;
      return { isLogin: false };

    default:
      return state;
  }
};

export const adminLoginReducer = (state={isLogin:false}, action) => {
  switch (action.type) {
    case actionType.ADMIN_SIGN_IN:
      return {
        isLogin: true,
        adminId: action.payload.adminId,
        role: action.payload.role,
      };

    case actionType.ADMIN_SIGN_OUT:
      delete state.adminId;
      delete state.role;
      return {
        isLogin: false,
      };

    default:
      return state;
  }
}