import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Employee_Provider } from "../../../context/Employee.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function Admin_protected_route() {
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();

  if (user_loading) {
    return <Loading_screen />;
  }

  if (!user) {
    return navigate("/login", { replace: true });
  }

  if (user?.role === "worker" || user?.role === "manager") {
    return navigate(`/${user?.role}`, { replace: true });
  }

  return (
    <Employee_Provider>
      <Outlet />
    </Employee_Provider>
  );
}
