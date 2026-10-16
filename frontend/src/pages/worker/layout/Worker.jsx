import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function Worker() {
  const navigate = useNavigate();
  const { user, user_loading } = useAuth();
  if (task_loading || user_loading) {
    return <Loading_screen />;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <Page_header logger={user} />
        <main className="w-full my-3.5">
          <Dashboard />
        </main>
      </div>
    </>
  );
}
