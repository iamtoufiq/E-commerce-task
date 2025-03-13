import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = getCookie("auth") === "success"; 

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export { PrivateRoute };
