import { useNavigate } from "react-router-dom";
import { Priority_tag, Status_tag } from "./Task_badges.jsx";

const PRIORITY = {
  urgent: { edge: "edge-alert" },
  high: { edge: "" },
  low: { edge: "edge-quiet" },
};


const STATUS = {
  pending: { dot: "", steps: 1, tone: "", card: "", title: "" },
  in_progress: { dot: "dot-info pulse", steps: 2, tone: "steps-info", card: "", title: "" },
  submitted: { dot: "dot-warn pulse", steps: 3, tone: "steps-warn", card: "", title: "" },
  approved: { dot: "dot-clear", steps: 4, tone: "steps-clear", card: "", title: "" },
  rejected: { dot: "dot-alert", steps: 4, tone: "steps-alert", card: "", title: "text-alert" },
  canceled: { dot: "", steps: 0, tone: "", card: "task-canceled", title: "muted" },
};

export default function Task_view_card({ task, edit_path }) {
  const navigate = useNavigate();

  const priority = PRIORITY[task.priority] ?? PRIORITY.low;
  const status = STATUS[task.status] ?? STATUS.pending;

  return (
    <article className={`card card-edge ${priority.edge} ${status.card} task`}>
      <div className="task-top">
        <div className="task-title">
          <span className={`dot ${status.dot}`}></span>
          <h3 className={`truncate ${status.title}`}>{task.title}</h3>
        </div>
        <div className="task-tags">
          <Priority_tag priority={task.priority} />
          <Status_tag status={task.status} />
        </div>
      </div>

      <p className="task-desc">{task.description}</p>

      <div className="task-foot">
        <div className="task-meta">
          <span className="truncate">
            <span className="k">Worker</span>
            <span className={task.assigned_to ? "" : "faint"}>
              {task.assigned_to?.name ?? "not assigned yet"}
            </span>
          </span>
          <span className="truncate">
            <span className="k">Manager</span>
            <span>{task.manager?.name}</span>
          </span>
        </div>

        <div className="task-end">
          <div
            className={`steps ${status.tone}`}
            role="img"
            aria-label={`step ${status.steps} of 4`}
          >
            {[1, 2, 3, 4].map(function (n) {
              return (
                <span key={n} className={`step ${n <= status.steps ? "step-on" : ""}`}></span>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => navigate(edit_path)}
          >
            Edit <span className="mark">[&gt;]</span>
          </button>
        </div>
      </div>
    </article>
  );
}
