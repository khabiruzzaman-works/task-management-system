import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";

export default function Manager_protected_route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-4xl text-green-200">loading</div>;
  }

  if (!user) {

    return <Navigate to="/login" replace />;
  }


  if (user?.role === "admin" || user?.role === "worker") {
    return <Navigate to="/login" replace />;
  }

  return( <Outlet />);
}
