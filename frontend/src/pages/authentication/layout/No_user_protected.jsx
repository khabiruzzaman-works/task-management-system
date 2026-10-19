import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function No_user_protected_route() {
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();

  if (user_loading) {
    return <Loading_screen />;
  }

  if (user?.role === "admin") {
    return navigate("/admin", { replace: true });
  }
  if (user?.role === "manager") {
    return navigate("/manager", { replace: true });
  }
  if (user?.role === "worker") {
    return navigate("/worker", { replace: true });
  }

  return <Outlet />;
}
