import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Tasks_Provider } from "../../../context/Task.context.jsx";

export default function Auth_protected_route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-4xl text-green-200">loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Tasks_Provider>
      <Outlet />
    </Tasks_Provider>
  );
}
