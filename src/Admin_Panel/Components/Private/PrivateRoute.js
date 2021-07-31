import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { ContextElement } from "../../../App";

const PrivateRouter = ({ children, ...rest }) => {

  const [cart, setCart, loginInfo, setLoginInfo] = useContext(ContextElement);

  // const sessionData = sessionStorage.getItem("admin_user_id");
  // if (sessionData) {
  //    const newData = { ...loginInfo };
  //    newData.adminLoginData.userId = sessionData;
  //    setLoginInfo(newData);
  // }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginInfo.adminLoginData.userId || sessionStorage.getItem("admin_user_id") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/adminLoginPage",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRouter;