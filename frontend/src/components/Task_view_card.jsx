import { useNavigate } from "react-router-dom";

const PRIORITY = {
  urgent: {
    tag: "border-alert/50 text-alert bg-alert/10 font-bold",
    marker: "[!]",
    accent: "border-l-alert",
  },
  high: {
    tag: "border-mark text-parchment bg-mark/10",
    marker: "",
    accent: "border-l-mark",
  },
  low: {
    tag: "border-hairline-strong text-dim",
    marker: "",
    accent: "border-l-ghost",
  },
};

const STATUS = {
  pending: {
    dot: "bg-dim",
    tag: "border-hairline-strong text-dim",
    card: "",
    title: "text-parchment",
  },
  in_progress: {
    dot: "bg-info animate-pulse",
    tag: "border-info/40 text-info bg-info/10",
    card: "border-info/20 hover:border-info/40",
    title: "text-parchment",
  },
  submitted: {
    dot: "bg-warn animate-pulse",
    tag: "border-warn/40 text-warn bg-warn/10",
    card: "border-warn/25 bg-warn/5 hover:border-warn/45 hover:bg-warn/10",
    title: "text-parchment",
  },
  approved: {
    dot: "bg-clear",
    tag: "border-clear/40 text-clear bg-clear/10",
    card: "border-clear/25 bg-clear/5 hover:border-clear/45 hover:bg-clear/10",
    title: "text-chalk",
  },
  rejected: {
    dot: "bg-alert",
    tag: "border-alert/50 text-alert bg-alert/10",
    card: "border-alert/30 bg-alert/5 hover:border-alert/50 hover:bg-alert/10",
    title: "text-alert",
  },
  canceled: {
    dot: "bg-ghost",
    tag: "border-hairline text-ghost",
    card: "opacity-60 hover:opacity-100",
    title: "text-fade line-through",
  },
};

export default function Task_view_card({ task, edit_path }) {
  const navigate = useNavigate();

  const priority = PRIORITY[task.priority] ?? PRIORITY.low;
  const status = STATUS[task.status] ?? STATUS.pending;

  return (
    <article
      className={`card-vintage-hover w-full flex flex-col sm:flex-row sm:items-center gap-4 border-l-2 ${priority.accent} ${status.card}`}
    >
      {/* left: the task */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`}
          ></span>
          <h3 className={`text-heading-md font-bold truncate ${status.title}`}>
            {task.title}
          </h3>
        </div>

        <p className="text-caption-md leading-normal text-prose line-clamp-2">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-0 pt-2 text-caption-md leading-normal">
          <span className="min-w-0 truncate">
            <span className="text-dim">Worker </span>
            <span className={task.assigned_to ? "text-chalk" : "text-dim"}>
              {task.assigned_to?.name ?? "not assigned yet"}
            </span>
          </span>
          <span className="min-w-0 truncate">
            <span className="text-dim">Manager </span>
            <span className="text-chalk">{task.manager?.name}</span>
          </span>
        </div>
      </div>

      {/* right: state + action */}
      <div className="flex sm:flex-col sm:items-end items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`tag-vintage capitalize ${priority.tag}`}>
            {priority.marker && (
              <span className="mr-1.5">{priority.marker}</span>
            )}
            {task.priority}
          </span>
          <span className={`tag-vintage capitalize ${status.tag}`}>
            {task.status.replaceAll("_", " ")}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-default"
          onClick={() => navigate(edit_path)}
        >
          Edit
        </button>
      </div>
    </article>
  );
}
