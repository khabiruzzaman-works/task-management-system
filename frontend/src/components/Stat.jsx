const TONE = {
  clear: "text-clear",
  alert: "text-alert",
  warn: "text-warn",
  info: "text-info",
};

export default function Stat({ label, value, caption, tone }) {
  return (
    <div className="stat">
      <span className="label label-caps">{label}</span>
      <span className={`stat-value ${TONE[tone] ?? ""}`}>{value}</span>
      <span className="muted text-xs">{caption}</span>
    </div>
  );
}
