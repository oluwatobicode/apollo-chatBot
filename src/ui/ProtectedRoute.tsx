import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

type ButtonProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ButtonProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default ProtectedRoute;
