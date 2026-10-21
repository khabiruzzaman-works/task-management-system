import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Worker_Provider } from "../../../context/Worker.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function Manager_protected_route() {
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();

  if (user_loading) {
    return <Loading_screen />;
  }

  if (!user) {
    return <Navigate to={"/login"} replace={true} />
  }

  if (user?.role === "admin" || user?.role === "worker") {
    return <Navigate to={`/${user?.role}`} replace={true} />
  }

  return (
    <Worker_Provider>
      <Outlet />
    </Worker_Provider>
  );
}
