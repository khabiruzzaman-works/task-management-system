import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";

import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import Stat from "../../../components/Stat.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function Manager() {
  const navigate = useNavigate();
  const { notify } = useToast();
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

  const manager_tasks = tasks.filter(function (task) {
    return task.manager?._id === user?._id;
  });

  function count(status) {
    return manager_tasks.filter((t) => t.status === status).length;
  }

  async function logout_handler() {
    const data = await logout_controller(access_token);
    if (!data.success) return notify(data.message, "error");
    set_user(null);
    set_access_token_globally(null);
    navigate("/login");
  }

  return (
    <>


      <main className="page page-dash">
        <div className="container">
          <div className="page-title">
            <p className="eyebrow">Manager overview</p>
            <h1>Team tasks</h1>
            <p className="muted">
              Manager overview. What's on your plate and who's carrying it.
            </p>
          </div>

          <div className="stack">
            <div className="grid-stats">
              <Stat label="Total" value={manager_tasks.length} caption="all tasks" />
              <Stat label="Pending" value={count("pending")} caption="not started" />
              <Stat label="In progress" value={count("in_progress")} caption="being worked on" tone="info" />
              <Stat label="Submitted" value={count("submitted")} caption="waiting for approval" tone="warn" />
              <Stat label="Approved" value={count("approved")} caption="finished" tone="clear" />
              <Stat label="Rejected" value={count("rejected")} caption="sent back" tone="alert" />
            </div>

            <div className="section-head">
              <h2>Your tasks</h2>
              <span className="faint text-sm">{manager_tasks.length} total</span>
            </div>

            {manager_tasks.length === 0 && (
              <div className="empty">
                <p className="empty-mark">[ ]</p>
                <p className="empty-title">Nothing on your plate.</p>
                <p className="muted">
                  Tasks the admin assigns to you will show up here.
                </p>
              </div>
            )}

            {manager_tasks.length > 0 && (
              <div className="flex flex-col gap-3">
                {manager_tasks.map(function (task) {
                  return (
                    <Task_view_card
                      key={task._id}
                      task={task}
                      edit_path={`/manager/task/edit/${task._id}`}
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
