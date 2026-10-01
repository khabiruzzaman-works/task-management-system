import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import Task_card_as_admin from "../components/Task_card_as_admin.jsx";
import { DUMMY_TASKS, STATUS_LABEL } from "../../data/dummy_tasks.js";

const PRIORITIES = ["All", "High", "Medium", "Low"];

export default function Admin() {
  const { user, loading, set_user, access_token, set_access_token } = useAuth();
  const navigate = useNavigate();
  const [search, set_search] = useState("");
  const [priority, set_priority] = useState("All");
  const [status, set_status] = useState("all");

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return;
    set_user(null);
    set_access_token(null);
    navigate("/login");
  }

  if (loading) return <div className="text-4xl text-green-300">Loading</div>;

  const q = search.trim().toLowerCase();
  const visible = DUMMY_TASKS.filter(
    (t) =>
      (priority === "All" || t.priority === priority) &&
      (status === "all" || t.status === status) &&
      (!q ||
        t.title.toLowerCase().includes(q) ||
        t.logger_name.toLowerCase().includes(q)),
  );

  const stats = [
    { label: "Total", value: DUMMY_TASKS.length },
    { label: "In progress", value: DUMMY_TASKS.filter((t) => t.status === "in_progress").length },
    { label: "Done", value: DUMMY_TASKS.filter((t) => t.status === "done").length },
    { label: "Overdue", value: DUMMY_TASKS.filter((t) => t.is_overdue && t.status !== "done").length, alert: true },
  ];

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-title-lg font-bold text-parchment">Task manager</h1>
          <div className="flex items-center gap-4">
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/register-worker")}>
              Register worker
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/promote")}>
             Give a promotion
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/demote")}>
             Give a demotion
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/task-creation")}>
             Create Task
            </button>
            <div className="flex flex-col items-end">
              <span className="text-body-md leading-normal text-chalk">{user?.name}</span>
              <button className="text-caption-md leading-normal text-fade btn btn-sm" onClick={logout_handler}>
                logout
              </button>
            </div>
          </div>
        </div>

        <hr className="hr-hairline" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {stats.map((s) => (
            <div key={s.label} className="card-vintage-stats">
              <div className={`text-title-lg font-bold ${s.alert && s.value > 0 ? "text-alert" : "text-parchment"}`}>
                {s.value}
              </div>
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
          {PRIORITIES.map((p) => (
            <button
              key={p}
              className={`btn btn-sm ${priority === p ? "btn-default" : "btn-ghost"}`}
              onClick={() => set_priority(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["all", "todo", "in_progress", "done"].map((s) => (
            <button
              key={s}
              className={`btn btn-sm ${status === s ? "btn-outline" : "btn-ghost"}`}
              onClick={() => set_status(s)}
            >
              {s === "all" ? "Any status" : STATUS_LABEL[s]}
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
              <Task_card_as_admin key={task.id} {...task} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
