import { Navigate } from "react-router-dom";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({ loggedIn, children }: Props) {
  return loggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}