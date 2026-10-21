import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useWorker } from "../../../context/Worker.context.jsx";

import { edit_task_as_manager_controller } from "../controller/edit_task_as_manager.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import { Priority_tag, Status_tag } from "../../../components/Task_badges.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

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
            <p className="empty-mark">[!]</p>
            <p className="empty-title">Couldn't find this task.</p>
            <p className="muted">It may have been removed or reassigned.</p>
            <div className="empty-actions">
              <button
                className="btn btn-sm"
                onClick={() => navigate("/manager/dashboard")}
              >
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
    navigate("/manager/tasks");
  }

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const can_change_worker =
    the_task.status === "pending" || the_task.status === "in_progress";

  return (
    <div className="w-full flex flex-col">
      <Buttons
        variant="ghost"
        text="Back to panel"
        onClick={function () {
          navigate("/manager/tasks");
        }}
      />

      <form onSubmit={submit_handler} className="card form-card">
        <div className="task-summary">
          <div className="row">
            <Priority_tag priority={the_task?.priority} />
            <Status_tag status={the_task?.status} />
          </div>
          <div>
            <span className="label label-caps">title</span>
            <h2>{the_task?.title}</h2>
          </div>
          <div>
            <span className="label label-caps">description</span>
            <p className="muted">{the_task?.description}</p>
          </div>
          <div className="facts">
            <div>
              <span className="label label-caps">manager</span>
              <span>{the_task?.manager?.name}</span>
            </div>
            <div>
              <span className="label label-caps">worker</span>
              <span className={the_task?.assigned_to ? "" : "faint"}>
                {the_task?.assigned_to?.name ?? "not assigned yet"}
              </span>
            </div>
          </div>
        </div>

        <div className="form-body">
          <div>
            <label className="label label-caps" htmlFor="status">
              status
            </label>
            <select
              id="status"
              className="select"
              name="status"
              disabled={true}
              value={form.status ?? the_task.status}
              onChange={input_handler}
            ></select>
          </div>

          <div>
            <label className="label label-caps" htmlFor="worker_email">
              worker
            </label>
            <select
              id="worker_email"
              onChange={input_handler}
              name="worker_email"
              disabled={!can_change_worker}
              value={form?.worker_email ?? the_task?.assigned_to?.email}
              className="select"
            >
              <option value={""}> Select a worker</option>
              {worker.map(function (user) {
                return (
                  <option key={user?.email} value={user?.email}>
                    {user?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-md btn-ghost"
            onClick={function () {
              navigate("/manager/tasks");
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
  );
}
