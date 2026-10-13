import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import Stat from "../../../components/Stat.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";
import Topbar from "../../../components/Topbar.jsx";

export default function Admin() {
  const { user, set_user, set_access_token_globally, user_loading } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  const { tasks, task_loading } = useTaskCenter();

  if (task_loading || user_loading) {
    return <Loading_screen />;
  }
  async function logout_handler() {
    const result = await logout_controller();
    if (!result.success) {
      return notify(result.message, "error");
    }
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }

  function count(status) {
    return tasks.filter((t) => t.status === status).length;
  }

  return (
    <>
      <Topbar
        role_label="Administrator"
        user_name={user?.name}
        on_change_password={() => navigate("/change-password")}
        on_logout={logout_handler}
      />

      <main className="page page-dash">
        <div className="container">
          <div className="page-title">
            <p className="eyebrow">Admin overview</p>
            <h1>Task manager</h1>
            <p className="muted">
              Admin overview. Everything you've created and who's on it.
            </p>
          </div>

          <div className="stack">
            <div className="grid-stats">
              <Stat label="Total" value={tasks.length} caption="all tasks" />
              <Stat label="Pending" value={count("pending")} caption="not started" />
              <Stat label="In progress" value={count("in_progress")} caption="being worked on" tone="info" />
              <Stat label="Submitted" value={count("submitted")} caption="waiting for approval" tone="warn" />
              <Stat label="Approved" value={count("approved")} caption="finished" tone="clear" />
              <Stat label="Rejected" value={count("rejected")} caption="sent back" tone="alert" />
              <Stat label="Canceled" value={count("canceled")} caption="called off" />
            </div>

            <div className="card card-soft actions-panel">
              <div>
                <span className="label label-caps">Tasks</span>
                <div className="row">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => navigate("/task-creation")}
                  >
                    [+] Create task
                  </button>
                </div>
              </div>
              <div>
                <span className="label label-caps">People</span>
                <div className="row">
                  <button className="btn btn-sm" onClick={() => navigate("/register-worker")}>
                    Register worker
                  </button>
                  <button className="btn btn-sm" onClick={() => navigate("/assign-worker")}>
                    Assign worker
                  </button>
                  <button className="btn btn-sm" onClick={() => navigate("/promote")}>
                    Give a promotion
                  </button>
                  <button className="btn btn-sm" onClick={() => navigate("/demote")}>
                    Give a demotion
                  </button>
                </div>
              </div>
            </div>

            <div className="section-head">
              <h2>All tasks</h2>
              <span className="faint text-sm">{tasks.length} total</span>
            </div>

            {tasks.length === 0 && (
              <div className="empty">
                <p className="empty-mark">[ ]</p>
                <p className="empty-title">No tasks yet.</p>
                <p className="muted">
                  Create one and assign it to a manager to get started.
                </p>
              </div>
            )}

            {tasks.length > 0 && (
              <div className="flex flex-col gap-3">
                {tasks.map(function (task) {
                  return (
                    <Task_view_card
                      key={task._id}
                      task={task}
                      edit_path={`/admin/task/edit/${task._id}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
