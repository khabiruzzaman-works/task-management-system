import { STATUS_LABEL } from "../../data/dummy_tasks.js";

const PRIORITY_STYLES = {
  High: { tag: "tag-vintage tag-advanced", marker: "[!]" },
  Medium: { tag: "tag-vintage tag-intermediate", marker: "" },
  Low: { tag: "tag-vintage", marker: "" },
};

const STATUS_TAG = {
  todo: "tag-vintage tag-draft",
  in_progress: "tag-vintage tag-intermediate",
  done: "tag-vintage tag-published",
};

// what the maworkernager's action button does next
const NEXT_ACTION = {
  todo: { label: "Start", next: "in_progress", cls: "btn-default" },
  in_progress: { label: "Approve", next: "done", cls: "btn-success" },
  done: { label: "Reopen", next: "in_progress", cls: "btn-ghost" },
};

export default function Task_card_as_manager({ task, on_status_change }) {
  const style = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Low;
  const action = NEXT_ACTION[task.status];

  return (
    <article className="card-vintage-hover flex flex-col gap-3 min-h-52">
      <div className="flex justify-between items-center gap-3">
        <span className={style.tag}>
          {style.marker && <span className="text-mark mr-1.5">{style.marker}</span>}
          {task.priority}
        </span>
        <span className={STATUS_TAG[task.status]}>{STATUS_LABEL[task.status]}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-heading-md font-bold truncate ${task.status === "done" ? "text-fade line-through" : "text-parchment"}`}>
          {task.title}
        </h3>
        <p className="text-caption-md leading-normal text-prose line-clamp-3">{task.description}</p>
      </div>

      <div className="flex justify-between items-center text-caption-md leading-normal">
        <span className="text-fade">Worker</span>
        <span className="text-chalk truncate">{task.logger_name}</span>
      </div>

      <div className="flex justify-between items-center border-t border-hairline pt-2 text-caption-md leading-normal">
        <span className={task.is_overdue && task.status !== "done" ? "text-alert" : "text-chalk"}>
          {task.is_overdue && task.status !== "done" && <span className="mr-1.5">[!]</span>}
          Due {task.deadline_date}
        </span>
        <button
          className={`btn btn-sm ${action.cls}`}
          onClick={() => on_status_change(task.id, action.next)}
        >
          {action.label}
        </button>
      </div>
    </article>
  );
}
