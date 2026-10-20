import { useAuth } from "../context/Auth.context";
import Loading_screen from "./pages/Loading_screen";

const role_label = {
  admin: "Administrator",
  manager: "Manager",
  worker: "Worker",
};

export default function Page_header() {
  const { user, user_loading } = useAuth();
  if (user_loading) {
    return <Loading_screen />;
  }
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-page/80 px-6 backdrop-blur">
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-widest text-faint">
          Welcome back
        </span>
        <span className="text-lg font-bold text-primary">{user?.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded border border-line-strong bg-raised px-2 py-0.5 text-xs text-muted">
          {role_label[user?.role] ?? user?.role}
        </span>
      </div>
    </header>
  );
}
