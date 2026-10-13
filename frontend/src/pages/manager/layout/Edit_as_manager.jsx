import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useWorker } from "../../../context/Worker.context.jsx";

import { edit_task_as_manager_controller } from "../controller/edit_task_as_manager.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

export default function Edit_task_as_manager() {
  let params = useParams();
  const [form, set_form] = useState({});
  const navigate = useNavigate();
  const { notify } = useToast();

  const { tasks, refresh_tasks, task_loading } = useTaskCenter();
  const { worker, worker_loading } = useWorker();
  if (task_loading || worker_loading) {
    return <Loading_screen />;
  }
  const the_task = tasks.find(function (task) {
    return task._id === params.task_id;
  });
  if (!the_task) {
    return (
      <main className="page">
        <div className="container container-narrow">
          <div className="empty empty-error">
            <p className="empty-title">Couldn't find this task.</p>
            <p className="muted">It may have been removed or reassigned.</p>
            <div className="row justify-center" style={{ marginTop: "var(--space-4)" }}>
              <button className="btn btn-sm" onClick={() => navigate("/manager")}>
                Back to team tasks
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  async function submit_handler(e) {
    e.preventDefault();
    const body = { ...form, task_id: the_task._id };
    const result = await edit_task_as_manager_controller(body);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/manager");
  }

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const is_available_status = {
    in_progress: [],
    submitted: [],
    pending: ["in_progress"],
    canceled: [],
    approved: [],
    rejected: [],
  };
  const is_allowed_status = is_available_status[the_task.status];
  const is_out_of_option = is_allowed_status.length === 0;
  const can_change_worker =
    the_task.status === "pending" || the_task.status === "in_progress";

  return (
    <main className="page">
      <div className="container container-narrow">
        <header className="page-header">
          <h1>Manage task</h1>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={function () {
              navigate("/manager");
            }}
          >
            back
          </button>
        </header>

        <form onSubmit={submit_handler} className="card stack">
          <div>
            <span className="label label-caps">title</span>
            <h2>{the_task?.title}</h2>
          </div>

          <div>
            <span className="label label-caps">description</span>
            <p className="muted">{the_task?.description}</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <span className="label label-caps">priority</span>
              <span className="tag capitalize">{the_task?.priority}</span>
            </div>
            <div>
              <span className="label label-caps">manager</span>
              <span>{the_task?.manager?.name}</span>
            </div>
          </div>

          <div>
            <label className="label label-caps" htmlFor="status">status</label>
            <select
              id="status"
              className="select"
              name="status"
              disabled={is_out_of_option}
              value={form.status ?? the_task.status}
              onChange={input_handler}
            >
              <option value={the_task.status}>{the_task.status} (currently)</option>
              {is_allowed_status.map(function (s, index) {
                return (
                  <option key={index} value={s}>
                    {s}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="label label-caps" htmlFor="worker_email">worker</label>
            <select
              id="worker_email"
              onChange={input_handler}
              name="worker_email"
              disabled={!can_change_worker}
              value={form?.worker_email ?? the_task?.assigned_to?.email}
              className="select"
            >
              <option value={the_task?.assigned_to?.email}>
                {the_task?.assigned_to?.name ?? "not assigned yet"} (currently)
              </option>
              {worker.map(function (user) {
                return (
                  <option key={user?.email} value={user?.email}>
                    {user?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row justify-end">
            <button
              type="button"
              className="btn btn-md btn-ghost"
              onClick={function () {
                navigate("/manager");
              }}
            >
              Cancel
            </button>
            <button className="btn btn-md btn-primary" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
