const dot = {
  info: "bg-info",
  warn: "bg-warn",
  clear: "bg-clear",
  alert: "bg-alert",
};
const stats = {
  info: "text-info",
  warn: "text-warn",
  clear: "text-clear",
  alert: "text-alert",
};

export default function Stat({ label, counter, caption, style = "" }) {
  return (
    <div className="flex flex-col border rounded-lg px-5 py-3 ">
      <span
        className={`${stats[style] || "text"} text-md flex items-center gap-1`}
      >
        <span
          className={`${dot[style] || "bg-mark"} h-1.5 w-1.5 shrink-0  rounded-full `}
        ></span>
        {label}
      </span>
      <span className={`${stats[style] || "text"} text-2xl`}>{counter}</span>
      <span className={`text-muted text-xs`}>{caption}</span>
    </div>
  );
}
