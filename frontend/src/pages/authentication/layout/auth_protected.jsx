import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { Tasks_Provider } from "../../../context/Task.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Side_bar from "../../../components/Side_bar.jsx";
import { logout_controller } from "../controller/logout.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";

export default function Auth_protected_route() {
  const { user, user_loading, set_user, set_access_token_globally } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  async function logout_handler() {
    const result = await logout_controller();
    if (!result.success) {
      return notify(result.message, "error");
    }
    set_user(null);
    set_access_token_globally(null);
    navigate("/login", { replace: true });
  }

  if (user_loading) {
    return <Loading_screen />;
  }

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <Tasks_Provider>
      <div className="flex w-full min-h-screen">
        <Side_bar logger={user} logout_handler={logout_handler} />
        <Outlet />
      </div>
    </Tasks_Provider>
  );
}
