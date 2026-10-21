import { useState } from "react";
import { task_creation_controller } from "../controller/task_creation.controller.js";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

export default function Task_creation() {
  const [task_form, set_task_form] = useState({
    title: "",
    description: "",
    priority: "high",
    status: "pending",
    manager_email: "",
  });
  const [submitting, set_submitting] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();
  const { employee, employee_loading } = useEmployee();
  const { refresh_tasks, task_loading } = useTaskCenter();

  if (employee_loading || task_loading) {
    return <Loading_screen />;
  }
  const managers = employee.filter(function (user) {
    return user.role === "manager";
  });

  async function submit_handler(e) {
    e.preventDefault();
    set_submitting(true);
    const result = await task_creation_controller(task_form);
    set_submitting(false);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/admin");
  }

  function input_handler(e) {
    set_task_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="w-full flex flex-col ">
      <Buttons
        variant="ghost"
        text={"Back to panel"}
        onClick={function () {
          navigate("/admin/tasks");
        }}
      />

      <form onSubmit={submit_handler} className="card form-card">
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
              placeholder="Task title"
              value={task_form.title}
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
              placeholder="What needs to be done"
              value={task_form.description}
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
                value={task_form.priority}
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
                value={task_form.status}
                onChange={input_handler}
              >
                <option value="pending">pending</option>
              </select>
              <p className="hint">New tasks always start as pending.</p>
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
              value={task_form.manager_email}
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
            <p className="hint">
              The manager will give this task to one of their workers.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-md btn-ghost"
            onClick={function () {
              navigate("/admin");
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-md btn-primary">
            {submitting ? "Creating Task" : "Create task"}
          </button>
        </div>
      </form>
    </div>
  );
}
