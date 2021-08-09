import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ children, ...rest }) => {

  const adminCredential = useSelector((state) => state.adminLoginData);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        adminCredential.isLogin ? (
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