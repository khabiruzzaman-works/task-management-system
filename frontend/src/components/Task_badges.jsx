const PRIORITY_TAG = {
  urgent: "tag-alert",
  high: "tag-mark",
  low: "",
};

const STATUS_TAG = {
  pending: "",
  in_progress: "tag-info",
  submitted: "tag-warn",
  approved: "tag-clear",
  rejected: "tag-alert",
  canceled: "",
};

export function Priority_tag({ priority }) {
  return (
    <span className={`tag capitalize ${PRIORITY_TAG[priority] ?? ""}`}>
      {priority === "urgent" && <span className="mr-1.5">[!]</span>}
      {priority.trim() ?? ""}
    </span>
  );
}

export function Status_tag({ status }) {
  return (
    <span className={`tag capitalize ${STATUS_TAG[status] ?? ""}`}>
      {status.trim() ?? ""}
    </span>
  );
}
