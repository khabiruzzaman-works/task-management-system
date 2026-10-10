import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Worker_Provider } from "../../../context/Worker.context.jsx";

export default function Manager_protected_route() {
  const { user, user_loading } = useAuth();

  if (user_loading) {
    return <div className="text-4xl text-green-200">loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin" || user?.role === "worker") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Worker_Provider>
      <Outlet />
    </Worker_Provider>
  );
}
