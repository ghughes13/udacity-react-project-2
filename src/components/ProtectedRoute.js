import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedInStatus = useSelector((state) => state.loggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInStatus ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
