// Display only: the bar at the top of the admin, manager and worker dashboards.
// The page keeps its own handlers and passes them in.

export default function Topbar({ role_label, user_name, on_change_password, on_logout }) {
  const initial = (user_name || "?").trim().charAt(0);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="row">
          <span className="brand">
            <span className="brand-mark">[#]</span>
            Task manager
          </span>
          <span className="tag">{role_label}</span>
        </div>

        <div className="topbar-end">
          <div className="user-chip">
            <span className="avatar" aria-hidden="true">{initial}</span>
            <span className="user-meta">
              <span className="truncate">{user_name}</span>
              <span className="faint text-xs">{role_label}</span>
            </span>
          </div>
          <span className="topbar-sep" aria-hidden="true"></span>
          <button type="button" className="btn btn-sm btn-ghost" onClick={on_change_password}>
            Change password
          </button>
          <button type="button" className="btn btn-sm btn-outline" onClick={on_logout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
