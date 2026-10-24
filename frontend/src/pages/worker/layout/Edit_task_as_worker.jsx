import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskCenter } from "../../../context/Task.context.jsx";
import { edit_task_as_worker_controller } from "../controller/edit_task_as_worker.controller.js";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import { Priority_tag, Status_tag } from "../../../components/Task_badges.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

export default function Edit_task_as_worker() {
  let params = useParams();
  const [form, set_form] = useState({});
  const navigate = useNavigate();
  const { notify } = useToast();
  const { tasks, refresh_tasks, task_loading } = useTaskCenter();
  if (task_loading) {
    return <Loading_screen />;
  }
  const the_task = tasks.find(function (task) {
    return task._id === params.task_id;
  });

  if (!the_task) {
    return (
      <div className="w-full flex flex-col">
        <div className="empty empty-error">
          <p className="empty-mark">[!]</p>
          <p className="empty-title">Couldn't find this task.</p>
          <p className="muted">It may have been removed or reassigned.</p>
          <div className="empty-actions">
            <button
              className="btn btn-sm"
              onClick={() => navigate("/worker/dashboard")}
            >
              Back to my tasks
            </button>
          </div>
        </div>
      </div>
    );
  }
  async function submit_handler(e) {
    e.preventDefault();
    const body = { ...form, task_id: params.task_id };
    const result = await edit_task_as_worker_controller(body);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_tasks();
    notify(result.message, "success");
    navigate("/worker");
  }

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const is_selection_valid = the_task.status === "in_progress";

  return (
    <div className="w-full flex flex-col">
      <Buttons
        variant="ghost"
        text="Back to panel"
        onClick={function () {
          navigate("/worker/tasks");
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
              <span className="label label-caps">worker</span>
              <span>{the_task?.assigned_to?.name}</span>
            </div>
            <div>
              <span className="label label-caps">manager</span>
              <span>{the_task?.manager?.name}</span>
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
              disabled={!is_selection_valid}
              value={form.status ?? the_task.status}
              onChange={input_handler}
            >
              <option value={"in_progress"}>In Progress (currently)</option>
              <option value={"submitted"}>Submit</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-md btn-ghost"
            onClick={function () {
              navigate("/worker");
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
