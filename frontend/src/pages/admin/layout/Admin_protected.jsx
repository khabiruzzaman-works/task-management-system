import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Employee_Provider } from "../../../context/Employee.context.jsx";

export default function Admin_protected_route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-4xl text-green-200">loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/worker" replace />;
  }

  return (
    <Employee_Provider>
      <Outlet />;
    </Employee_Provider>
  );
}
