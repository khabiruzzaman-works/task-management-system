export default function Loading_screen() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <div className="spinner" role="status" aria-label="loading" />
      <span className="muted text-sm">
        <span className="mark">[#]</span> loading
      </span>
    </main>
  );
}
