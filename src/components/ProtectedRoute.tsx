import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { useUserContext } from "../hooks/useUser";

interface ReverseAuth {
  requireNoAuth?: boolean;
}

const ProtectedRoute: React.FC<RouteProps & ReverseAuth> = (routeProps) => {
  const { user } = useUserContext();

  if (routeProps.requireNoAuth) {
    if (!user) {
      return <Route {...routeProps} />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (user) {
      return <Route {...routeProps} />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default ProtectedRoute;
