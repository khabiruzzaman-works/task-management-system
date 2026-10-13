import { useNavigate } from "react-router-dom";

const PRIORITY = {
  urgent: { tag: "tag-alert", marker: "[!]", edge: "edge-alert" },
  high: { tag: "tag-mark", marker: "", edge: "" },
  low: { tag: "", marker: "", edge: "edge-quiet" },
};

const STATUS = {
  pending: { dot: "", tag: "", card: "", title: "" },
  in_progress: { dot: "dot-info pulse", tag: "tag-info", card: "", title: "" },
  submitted: { dot: "dot-warn pulse", tag: "tag-warn", card: "", title: "" },
  approved: { dot: "dot-clear", tag: "tag-clear", card: "", title: "" },
  rejected: { dot: "dot-alert", tag: "tag-alert", card: "", title: "text-alert" },
  canceled: {
    dot: "",
    tag: "",
    card: "opacity-60 hover:opacity-100",
    title: "muted line-through",
  },
};

export default function Task_view_card({ task, edit_path }) {
  const navigate = useNavigate();

  const priority = PRIORITY[task.priority] ?? PRIORITY.low;
  const status = STATUS[task.status] ?? STATUS.pending;

  return (
    <article
      className={`card card-hover card-edge ${priority.edge} ${status.card} w-full flex flex-col sm:flex-row sm:items-center gap-4`}
    >
      {/* left: the task */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`dot ${status.dot}`}></span>
          <h3 className={`truncate ${status.title}`}>{task.title}</h3>
        </div>

        <p className="muted text-sm line-clamp-2">{task.description}</p>

        <div className="flex flex-wrap gap-x-6 text-sm pt-2">
          <span className="truncate">
            <span className="muted">Worker </span>
            <span className={task.assigned_to ? "" : "muted"}>
              {task.assigned_to?.name ?? "not assigned yet"}
            </span>
          </span>
          <span className="truncate">
            <span className="muted">Manager </span>
            <span>{task.manager?.name}</span>
          </span>
        </div>
      </div>

      {/* right: state + action */}
      <div className="flex sm:flex-col sm:items-end items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`tag capitalize ${priority.tag}`}>
            {priority.marker && <span className="mr-1.5">{priority.marker}</span>}
            {task.priority}
          </span>
          <span className={`tag capitalize ${status.tag}`}>
            {task.status.replaceAll("_", " ")}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => navigate(edit_path)}
        >
          Edit
        </button>
      </div>
    </article>
  );
}
