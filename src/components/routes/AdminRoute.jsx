import { useLocation, Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole"; 
import MoonLoaderComponent from "../../Pages/Shared/Loader/MoonLoaderComponent";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(); 
  const location = useLocation();

  if (loading || isLoading) return <MoonLoaderComponent/>;

  if (!user || role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
