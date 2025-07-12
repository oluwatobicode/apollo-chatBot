import { useNavigate } from "react-router-dom";
import Login from "../components/Login/LogInForm";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";

function LogIn() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
}
export default LogIn;
