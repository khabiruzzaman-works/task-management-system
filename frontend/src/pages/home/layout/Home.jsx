import { Link } from "react-router-dom";

const STEPS = [
  { mark: "[+]", who: "Admin", text: "creates a task and picks a manager." },
  { mark: "[>]", who: "Manager", text: "hands it to a worker on their team." },
  { mark: "[>]", who: "Worker", text: "does the work and submits it." },
  { mark: "[x]", who: "Admin", text: "reviews it, then approves or rejects." },
];

const FEATURES = [
  { title: "Three roles", text: "Admin, manager and worker each get their own dashboard and permissions." },
  { title: "Strict workflow", text: "Status changes follow fixed transitions, and the server enforces every one." },
  { title: "Secure sessions", text: "Short-lived access token plus an httpOnly refresh cookie, with silent refresh." },
  { title: "Org-only accounts", text: "Only your organisation's email domain can log in. Admins create accounts, so there is no public sign-up." },
];

const STACK = ["React 19", "Vite", "React Router 7", "Tailwind 4", "Express 5", "MongoDB", "JWT"];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <span className="brand">
            <span className="brand-mark" aria-hidden="true">[#]</span>
            Task manager
          </span>
          <Link to="/login" className="btn btn-sm btn-outline">Log in</Link>
        </div>
      </header>

      <main className="page page-dash">
        <div className="container">
          <section className="hero stack">
            <p className="eyebrow">Role-based task management</p>
            <h1>Every task, one clear path.</h1>
            <p className="muted hero-lead">
              An admin creates work, a manager delegates it, a worker delivers it,
              and the admin signs it off. Each step is enforced on the server,
              not just hidden in the UI.
            </p>
            <div className="row">
              <Link to="/login" className="btn btn-md btn-primary">Log in</Link>
              <span className="faint text-sm">
                Accounts are created by your admin.
              </span>
            </div>
          </section>

          <section className="stack">
            <div className="section-head">
              <h2>How work moves</h2>
            </div>
            <ol className="auth-flow">
              {STEPS.map(function (s, i) {
                return (
                  <li key={i}>
                    <span aria-hidden="true">{s.mark}</span>
                    <span><strong>{s.who}</strong> {s.text}</span>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="stack home-section">
            <div className="section-head">
              <h2>What's inside</h2>
            </div>
            <div className="feature-grid">
              {FEATURES.map(function (f) {
                return (
                  <article key={f.title} className="card">
                    <h3>{f.title}</h3>
                    <p className="muted text-sm">{f.text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="stack home-section">
            <div className="section-head">
              <h2>Built with</h2>
            </div>
            <div className="row">
              {STACK.map(function (t) {
                return <span key={t} className="tag">{t}</span>;
              })}
            </div>
          </section>

          <footer className="home-footer faint text-xs">
            Source code and full documentation are in the project README.
          </footer>
        </div>
      </main>
    </>
  );
}
