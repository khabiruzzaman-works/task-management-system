import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import Stat from "../../../components/Stat.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";
import Topbar from "../../../components/Topbar.jsx";

export default function Worker() {
  const navigate = useNavigate();
  const {
    user,
    set_user,
    user_loading,
    access_token,
    set_access_token_globally,
  } = useAuth();
  const { tasks, task_loading } = useTaskCenter();
  if (task_loading || user_loading) {
    return <Loading_screen />;
  }

  const worker_tasks = tasks.filter(function (task) {
    return task?.assigned_to?._id === user?._id;
  });

  function count(status) {
    return worker_tasks.filter((t) => t.status === status).length;
  }

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return;
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }

  return (
    <>
      <Topbar
        role_label="Worker"
        user_name={user?.name || "name not found"}
        on_change_password={() => navigate("/change-password")}
        on_logout={logout_handler}
      />

      <main className="page page-dash">
        <div className="container">
          <div className="page-title">
            <p className="eyebrow">Worker overview</p>
            <h1>My tasks</h1>
            <p className="muted">Everything assigned to you and where it stands.</p>
          </div>

          <div className="stack">
            <div className="grid-stats">
              <Stat label="Total" value={worker_tasks.length} caption="all tasks" />
              <Stat label="In progress" value={count("in_progress")} caption="being worked on" tone="info" />
              <Stat label="Submitted" value={count("submitted")} caption="waiting for approval" tone="warn" />
              <Stat label="Approved" value={count("approved")} caption="finished" tone="clear" />
              <Stat label="Rejected" value={count("rejected")} caption="sent back" tone="alert" />
            </div>

            <div className="section-head">
              <h2>Assigned to you</h2>
              <span className="faint text-sm">{worker_tasks.length} total</span>
            </div>

            {worker_tasks.length === 0 && (
              <div className="empty">
                <p className="empty-mark">[ ]</p>
                <p className="empty-title">Nothing assigned yet.</p>
                <p className="muted">
                  When your manager gives you a task, it will show up here.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {worker_tasks.map(function (task) {
                return (
                  <Task_view_card
                    key={task._id}
                    task={task}
                    edit_path={`/worker/task/edit/${task._id}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
