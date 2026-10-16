const role_label = {
  admin: "Administrator",
  manager: "Manager",
  worker: "Worker",
};

export default function Page_header({ logger }) {

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-page/80 px-6 backdrop-blur">
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-widest text-faint">
          Welcome back
        </span>
        <span className="text-lg font-bold text-fg">{logger?.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded border border-line-strong bg-raised px-2 py-0.5 text-xs text-muted">
          {role_label[logger?.role] ?? logger?.role}
        </span>
      </div>
    </header>
  );
}
