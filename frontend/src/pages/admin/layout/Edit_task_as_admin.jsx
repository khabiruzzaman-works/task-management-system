import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { edit_task_as_admin_controller } from "../controller/edit_task_as_admin.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import { Priority_tag, Status_tag } from "../../../components/Task_badges.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

export default function Edit_task_as_admin() {
  const { tasks, refresh_tasks, task_loading } = useTaskCenter();
  const { employee, employee_loading } = useEmployee();
  let params = useParams();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [adds, set_adds] = useState({});
  const [submitting, set_submitting] = useState(false);
  if (task_loading || employee_loading) {
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
            <p className="muted">It may have been removed.</p>
            <div className="empty-actions">
              <button
                className="btn btn-sm"
                onClick={() => navigate("/admin/tasks")}
              >
                Back to all tasks
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
  const managers = employee.filter(function (user) {
    return user.role === "manager";
  });
  const elements = {
    title: the_task.title,
    description: the_task.description,
    status: the_task.status,
    priority: the_task.priority,
    manager_email: the_task?.manager?.email,
    task_id: the_task._id,
  };

  const form = { ...elements, ...adds };
  async function submit_handler(e) {
    e.preventDefault();
    set_submitting(true);
    const result = await edit_task_as_admin_controller({
      ...adds,
      task_id: the_task._id,
    });
    set_submitting(false);

    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/admin/tasks");
  }

  function input_handler(e) {
    set_adds(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const is_available_status = {
    in_progress: ["canceled"],
    submitted: ["rejected", "approved", "canceled"],
    pending: ["canceled"],
    canceled: [],
    approved: [],
    rejected: [],
  };
  const is_allowed_status = is_available_status[the_task.status];
  const is_out_of_option = is_allowed_status.length === 0;
  const can_change_manager = the_task.status === "pending";
  const can_edit = the_task.status === "pending";

  return (
    <div className="w-full flex flex-col">
      <Buttons
        variant="ghost"
        text={"Back to panel"}
        onClick={function () {
          navigate("/admin/tasks");
        }}
      />

      <form onSubmit={submit_handler} className="card form-card">
        <div className="task-summary">
          <div className="row">
            <Priority_tag priority={the_task.priority} />
            <Status_tag status={the_task.status} />
          </div>
          {is_out_of_option && (
            <p className="muted text-sm">
              This task is finished, so nothing on it can be changed anymore.
            </p>
          )}
          {!is_out_of_option && !can_edit && (
            <p className="muted text-sm">
              The details are locked. Only the status can be changed now.
            </p>
          )}
        </div>

        <div className="form-body">
          <div>
            <label className="label label-caps" htmlFor="title">
              title
            </label>
            <input
              id="title"
              className="input"
              type="text"
              name="title"
              disabled={!can_edit}
              placeholder="Task title"
              value={form.title ?? the_task.title}
              onChange={input_handler}
              required
            />
          </div>

          <div>
            <label className="label label-caps" htmlFor="description">
              description
            </label>
            <textarea
              id="description"
              className="textarea"
              rows={4}
              name="description"
              disabled={!can_edit}
              placeholder="What needs to be done"
              value={form.description ?? the_task.description}
              onChange={input_handler}
              required
            />
          </div>

          <div className="form-split">
            <div>
              <label className="label label-caps" htmlFor="priority">
                priority
              </label>
              <select
                id="priority"
                className="select"
                name="priority"
                disabled={!can_edit}
                value={form.priority ?? the_task.priority}
                onChange={input_handler}
              >
                <option value="high">high</option>
                <option value="low">low</option>
                <option value="urgent">urgent</option>
              </select>
            </div>

            <div>
              <label className="label label-caps" htmlFor="status">
                status
              </label>
              <select
                id="status"
                className="select"
                name="status"
                disabled={is_out_of_option}
                value={form.status ?? the_task.status}
                onChange={input_handler}
              >
                <option value={the_task.status}>
                  {the_task.status} (currently)
                </option>
                {is_allowed_status.map(function (s, index) {
                  return (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="label label-caps" htmlFor="manager_email">
              manager
            </label>
            <select
              id="manager_email"
              className="select"
              name="manager_email"
              disabled={!can_change_manager}
              value={form.manager_email ?? the_task?.manager?.email}
              onChange={input_handler}
              required
            >
              <option value="">select a manager</option>
              {managers.map(function (manager) {
                return (
                  <option key={manager.email} value={manager.email}>
                    {manager.name}
                  </option>
                );
              })}
            </select>
            {can_change_manager && (
              <p className="hint">
                Picking a different manager sends the task back to pending.
              </p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-md btn-ghost"
            onClick={function () {
              navigate("/admin/tasks");
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-md btn-primary">
            {submitting ? "Saving changes" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
