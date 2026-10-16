import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context.jsx";
import Loading_screen from "./Loading_screen.jsx";
import Buttons from "../buttons/buttons.jsx";

export default function Not_found() {
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();

  if (user_loading) {
    return <Loading_screen />;
  }

  const redirection = user ? `/${user.role}` : "/login";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex items-start gap-1">
        <span className="text-muted text-6xl">404</span>
        <span className="text-mark text-lg" aria-hidden="true">
          [!]
        </span>
      </div>
      <p className="text-muted">That page doesn't exist or has moved.</p>
      <Buttons
        variant="secondary"
        text={user ? "Back to dashboard" : "Go to login"}

        onClick={function () {
          navigate(redirection, { replace: true });
        }}
      />
    </main>
  );
}
