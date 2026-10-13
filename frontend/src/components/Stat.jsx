const TONE = {
  clear: "text-clear",
  alert: "text-alert",
  warn: "text-warn",
  info: "text-info",
};

const DOT = {
  clear: "dot-clear",
  alert: "dot-alert",
  warn: "dot-warn",
  info: "dot-info",
};

export default function Stat({ label, value, caption, tone }) {
  return (
    <div className="stat">
      <span className="label label-caps">
        <span className={`dot ${DOT[tone] ?? ""}`}></span>
        {label}
      </span>
      <span className={`stat-value ${TONE[tone] ?? ""}`}>{value}</span>
      <span className="faint text-xs">{caption}</span>
    </div>
  );
}
