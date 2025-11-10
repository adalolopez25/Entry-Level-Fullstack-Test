<<<<<<< HEAD
=======
import type React from "react";
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
import { Navigate } from "react-router-dom";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({ loggedIn, children }: Props) {
<<<<<<< HEAD
  return loggedIn ? <>{children}</> : <Navigate to="/login" replace />;
=======
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
}