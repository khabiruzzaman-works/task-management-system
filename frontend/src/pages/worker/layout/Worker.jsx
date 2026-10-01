import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { DUMMY_TASKS, STATUS_LABEL } from "../../data/dummy_tasks.js";
import Task_card_as_worker from "../components/Task_card_as_worker.jsx";

// dummy: pretend the logged-in worker is "Rafi"
const MY_NAME = "Rafi";
const TABS = ["all", "todo", "in_progress", "done"];

export default function Worker() {
  const navigate = useNavigate();
  const { user, set_user, access_token, set_access_token } = useAuth();
  const [tasks, set_tasks] = useState(
    DUMMY_TASKS.filter((t) => t.logger_name === MY_NAME),
  );
  const [tab, set_tab] = useState("all");

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

  const count = (s) => tasks.filter((t) => t.status === s).length;
  const overdue = tasks.filter((t) => t.is_overdue && t.status !== "done").length;
  const visible = tab === "all" ? tasks : tasks.filter((t) => t.status === tab);

  return (
    <main className="min-h-screen w-full bg-canvas">
      <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-24">
        <div className="flex justify-between items-center pb-6">
          <div>
            <h1 className="text-title-lg font-bold text-parchment">My tasks</h1>
            <p className="text-caption-md leading-normal text-fade">
              {overdue > 0 ? `${overdue} overdue, start there.` : "Nothing overdue."}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-body-md leading-normal text-chalk">{user?.name || MY_NAME}</span>
            <button className="text-caption-md leading-normal text-fade btn btn-sm" onClick={logout_handler}>
              logout
            </button>
          </div>
        </div>

        <hr className="hr-hairline" />

        <div className="grid grid-cols-3 gap-4 my-6">
          {["todo", "in_progress", "done"].map((s) => (
            <div key={s} className="card-vintage-stats">
              <div className="text-title-lg font-bold text-parchment">{count(s)}</div>
              <div className="text-caption-md leading-normal text-fade">{STATUS_LABEL[s]}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              className={`btn btn-sm ${tab === t ? "btn-default" : "btn-ghost"}`}
              onClick={() => set_tab(t)}
            >
              {t === "all" ? "All" : STATUS_LABEL[t]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="card-vintage-soft text-center text-caption-md leading-normal text-fade py-10">
            No tasks in {tab === "all" ? "your list" : STATUS_LABEL[tab]}.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
            {visible.map((task) => (
              <Task_card_as_worker key={task.id} task={task} on_status_change={change_status} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
