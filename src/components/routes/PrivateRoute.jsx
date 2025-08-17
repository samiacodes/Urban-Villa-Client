import useAuth from "../../hooks/useAuth";
import MoonLoaderComponent from "../../Pages/Shared/Loader/MoonLoaderComponent";

import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <MoonLoaderComponent/>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
