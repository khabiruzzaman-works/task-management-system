import { NavLink } from "react-router-dom";
import Buttons from "./buttons/buttons";

const role_label = {
  admin: "Administrator",
  manager: "Manager",
  worker: "Worker",
};

const link_idle = "text-muted hover:bg-overlay hover:text-primary";
const link_active = "bg-overlay text-primary border-line-strong";

function Side_link({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={(function ({ isActive }) {
        return ` ${isActive ? link_active : link_idle}`;
      })`flex items-center gap-2 rounded px-3 py-2 text-sm border border-transparent transition-colors duration-200`}
    >
      {function ({ isActive }) {
        return (
          <>
            <span
              className={isActive ? "text-mark" : "text-faint"}
              aria-hidden="true"
            >
              [&gt;]
            </span>
            {children}
          </>
        );
      }}
    </NavLink>
  );
}

export default function Side_bar({ logger, logout_handler }) {
  const initial = (logger?.name || "?").trim().charAt(0);

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-line bg-sunken">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-2 px-1 pt-1 font-bold text-primary">
          <span className="text-mark">[#]</span>
          <h1 className="text-primary font-bold leading-tight">
            Task Management System
          </h1>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Main">
          <p className="px-3 pb-1 text-xs uppercase tracking-widest text-faint">
            Workspace
          </p>
          <Side_link to={`/${logger?.role}`} end>
            Dashboard
          </Side_link>
          <Side_link to={`/${logger?.role}/task`} end>
            Tasks
          </Side_link>
          {logger?.role !== "worker" && (
            <Side_link to="/employees">Employees</Side_link>
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-line p-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="grid size-9 shrink-0 place-items-center rounded border border-line-strong bg-raised text-sm font-bold uppercase text-primary"
            aria-hidden="true"
          >
            {initial}
          </span>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm text-primary">{logger?.name}</span>
            <span className="truncate text-xs text-faint">
              {role_label[logger?.role] ?? logger?.role}
            </span>
          </div>
        </div>
        <Buttons
          variant="secondary"
          size="sm"
          style="w-full"
          text="Logout"
          onClick={logout_handler}
        />
      </div>
    </aside>
  );
}
