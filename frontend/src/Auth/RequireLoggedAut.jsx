import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireLoggedAut = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return !auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/home"} state={{ from: location }} replace />
  );
};

export default RequireLoggedAut;
