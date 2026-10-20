import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function No_user_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <Loading_screen />;
  }

  if (user?.role === "admin") {
    return <Navigate to={"/admin"} replace={true} />;
  }
  if (user?.role === "manager") {
    return <Navigate to={"/manager"} replace={true} />;
  }
  if (user?.role === "worker") {
    return <Navigate to={"/worker"} replace={true} />;
  }

  return <Outlet />;
}
