import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { logout_controller } from "../../authentication/controller/logout.controller.js";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import Task_view_card from "../../../components/Task_view_card.jsx";
import Stat from "../../../components/Stat.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Page_header from "../../../components/Page_header.jsx";
import Side_bar from "../../../components/Side_bar.jsx";
import Dashboard from "../../../components/pages/Dashboard.jsx";

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

  return (
    <>
      <div className="flex flex-col w-full">
        <Page_header logger={user} />
        <main className="w-full my-3.5">
          <Dashboard />
          {/* <div className="w-full flex justify-evenly my-3.5">
          <Stat label="Total" counter={tasks.length} caption="all tasks" />
          <Stat
            label="Pending"
            counter={count("pending")}
            caption="not started"
          />
          <Stat
            label="In progress"
            counter={count("in_progress")}
            caption="being worked on"
            style="info"
          />
          <Stat
            label="Submitted"
            counter={count("submitted")}
            caption="waiting for approval"
            style="warn"
          />
          <Stat
            label="Approved"
            counter={count("approved")}
            caption="finished"
            style="clear"
          />
          <Stat
            label="Rejected"
            counter={count("rejected")}
            caption="sent back"
            style="alert"
          />
          <Stat
            label="Canceled"
            counter={count("canceled")}
            caption="called off"
          />
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
              <button
                className="btn btn-sm"
                onClick={() => navigate("/register-worker")}
              >
                Register worker
              </button>
              <button
                className="btn btn-sm"
                onClick={() => navigate("/assign-worker")}
              >
                Assign worker
              </button>
              <button
                className="btn btn-sm"
                onClick={() => navigate("/promote")}
              >
                Give a promotion
              </button>
              <button
                className="btn btn-sm"
                onClick={() => navigate("/demote")}
              >
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
        )}*/}
        </main>
      </div>
    </>
  );
}
