import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { DUMMY_TASKS, STATUS_LABEL } from "../../data/dummy_tasks.js";
import Task_card_as_manager from "../components/Task_card_as_manager.jsx";

const TABS = ["all", "todo", "in_progress", "done"];

export default function Manager() {
  const navigate = useNavigate();
  const { user, set_user, access_token, set_access_token } = useAuth();
  // dummy: pretend every dummy task belongs to this manager's team
  const [tasks, set_tasks] = useState(DUMMY_TASKS);
  const [tab, set_tab] = useState("all");
  const [search, set_search] = useState("");
  const [worker, set_worker] = useState("All");

  function change_status(id, status) {
    set_tasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return;
    set_user(null);
    set_access_token(null);
    navigate("/login");
  }

  const team = ["All", ...new Set(tasks.map((t) => t.logger_name))];
  const count = (s) => tasks.filter((t) => t.status === s).length;
  const overdue = tasks.filter((t) => t.is_overdue && t.status !== "done").length;

  const q = search.trim().toLowerCase();
  const visible = tasks.filter(
    (t) =>
      (tab === "all" || t.status === tab) &&
      (worker === "All" || t.logger_name === worker) &&
      (!q ||
        t.title.toLowerCase().includes(q) ||
        t.logger_name.toLowerCase().includes(q)),
  );

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <div>
            <h1 className="text-title-lg font-bold text-parchment">Team tasks</h1>
            <p className="text-caption-md leading-normal text-fade">
              {overdue > 0 ? `${overdue} overdue on your team.` : "Nothing overdue."}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-body-md leading-normal text-chalk">{user?.name}</span>
            <button
              className="text-caption-md leading-normal text-fade btn btn-sm"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
            <button className="text-caption-md leading-normal text-fade btn btn-sm" onClick={logout_handler}>
              logout
            </button>
          </div>
        </div>

        <hr className="hr-hairline" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {[
            { label: "Total", value: tasks.length },
            { label: STATUS_LABEL.todo, value: count("todo") },
            { label: STATUS_LABEL.in_progress, value: count("in_progress") },
            { label: STATUS_LABEL.done, value: count("done") },
          ].map((s) => (
            <div key={s.label} className="card-vintage-stats">
              <div className="text-title-lg font-bold text-parchment">{s.value}</div>
              <div className="text-caption-md leading-normal text-fade">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Search by title or worker"
            value={search}
            onChange={(e) => set_search(e.target.value)}
            className="input-vintage text-caption-md leading-normal py-1 max-w-xs mr-2"
          />
          {team.map((w) => (
            <button
              key={w}
              className={`btn btn-sm ${worker === w ? "btn-default" : "btn-ghost"}`}
              onClick={() => set_worker(w)}
            >
              {w}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              className={`btn btn-sm ${tab === t ? "btn-outline" : "btn-ghost"}`}
              onClick={() => set_tab(t)}
            >
              {t === "all" ? "Any status" : STATUS_LABEL[t]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="card-vintage-soft text-center text-caption-md leading-normal text-fade py-10">
            No tasks match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
            {visible.map((task) => (
              <Task_card_as_manager key={task.id} task={task} on_status_change={change_status} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
