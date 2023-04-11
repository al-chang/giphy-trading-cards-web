import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUser";
import { Role } from "../types";

type ProtectedRouteProps = {
  allowedRoles: Role[];
};

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({
  allowedRoles,
  children,
}) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  const hasAccess = !!user && allowedRoles.includes(user.role);
  if (!hasAccess) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
