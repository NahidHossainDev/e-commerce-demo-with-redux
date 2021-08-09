import * as actionType from "./loginTypes";

export const userLogin = (data) => (dispatch, getState) => {
    dispatch({
        type: actionType.USER_SIGN_IN,
        payload: {
          userName: data.userName,
          phoneNumber: data.phoneNumber,
        }
    })
  
  sessionStorage.setItem("userData", JSON.stringify(getState().userLoginData));
}

export const userLogout = () => (dispatch) => {
  dispatch({
    type: actionType.USER_SIGN_OUT,
  });
};

export const adminLogin = (data) => (dispatch, getState) => {
  dispatch({
    type: actionType.ADMIN_SIGN_IN,
    payload: {
      adminId: data.userId,
      role: data.role,
    },
  });
  sessionStorage.setItem("adminData", JSON.stringify(getState().adminLoginData));
};

export const adminLogOut = () => (dispatch) => {
  dispatch({
    type: actionType.ADMIN_SIGN_OUT,
  });
};