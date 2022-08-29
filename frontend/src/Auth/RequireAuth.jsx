import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/signIn"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
