import { Link } from "react-router-dom";

const STEPS = [
  {
    mark: "[+]",
    who: "Admin",
    text: "Creates the task, sets a priority and picks a manager.",
  },
  {
    mark: "[>]",
    who: "Manager",
    text: "Gives the task to a worker on their own team.",
  },
  {
    mark: "[>]",
    who: "Worker",
    text: "Does the work and submits it for review.",
  },
  {
    mark: "[x]",
    who: "Admin",
    text: "Reads the result, then approves or rejects it.",
  },
];

const ROLES = [
  {
    name: "Admin",
    line: "Runs the organisation.",
    can: [
      "Create, edit and cancel tasks",
      "Approve or reject submitted work",
      "Register people, promote and demote",
      "Put workers on a manager's team",
    ],
  },
  {
    name: "Manager",
    line: "Runs a team.",
    can: [
      "See every task assigned to them",
      "Hand a task to one of their workers",
      "Take it back and pick someone else",
      "See their team members",
    ],
  },
  {
    name: "Worker",
    line: "Does the work.",
    can: [
      "See only the tasks given to them",
      "Move a task to submitted when done",
      "Track status on their dashboard",
      "Change their own password",
    ],
  },
];

const FEATURES = [
  {
    title: "Fixed status flow",
    text: "pending, in progress, submitted, then approved or rejected. Nobody can skip a step.",
  },
  {
    title: "Checked on the server",
    text: "Every rule is enforced by the API. Hiding a button is never the only protection.",
  },
  {
    title: "Closed to outsiders",
    text: "Only emails from your organisation's domain can log in, and there is no public sign-up.",
  },
  {
    title: "Safe sessions",
    text: "A short-lived access token with a refresh cookie, renewed quietly in the background.",
  },
];

const SOCIALS = [
  { name: "GitHub", handle: "github.com/your-username", href: "#" },
  { name: "LinkedIn", handle: "linkedin.com/in/your-name", href: "#" },
  { name: "Email", handle: "you@example.com", href: "#" },
  { name: "Portfolio", handle: "your-site.dev", href: "#" },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-page text-primary">
      <header className="sticky top-0 z-20 border-b border-line bg-page/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="flex items-center gap-2 font-bold">
            <span className="text-mark" aria-hidden="true">
              [#]
            </span>
            Task manager
          </span>
          <Link
            to="/login"
            className="inline-flex h-8 items-center justify-center rounded border border-line-strong bg-raised px-3 text-sm text-primary transition-colors duration-200 hover:bg-overlay"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 pb-24">
        <section className="grid items-center gap-12 pt-20 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl leading-tight font-bold">
              Assign work. Follow it. Sign it off.
            </h1>
            <p className="max-w-md text-muted">
              A task manager for teams that have a clear chain of command. An
              admin creates the task, a manager passes it to a worker, the
              worker submits it, and the admin has the final say.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded border border-accent bg-accent px-6 font-bold text-on-accent transition-colors duration-200 hover:bg-accent/90"
              >
                Log in
              </Link>
              <span className="text-sm text-faint">
                No sign-up. Your admin creates your account.
              </span>
            </div>
          </div>

          <div
            className="flex flex-col gap-4 rounded border border-line border-l-warn bg-raised p-5 shadow-lg"
            style={{ borderLeftWidth: "2px" }}
            aria-hidden="true"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warn" />
                <span className="font-bold">Prepare the Q4 report</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded border border-alert/50 bg-alert/10 px-2 text-alert">
                  [!] urgent
                </span>
                <span className="rounded border border-warn/45 bg-warn/10 px-2 text-warn">
                  submitted
                </span>
              </div>
            </div>
            <p className="text-sm text-muted">
              Collect the numbers from every team and write the summary for
              Monday's review.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-sm">
              <div className="flex gap-5">
                <span>
                  <span className="mr-1 text-faint">Worker</span>Sadia
                </span>
                <span>
                  <span className="mr-1 text-faint">Manager</span>Karim
                </span>
              </div>
              <div className="flex w-24 gap-1">
                <span className="h-1 flex-1 rounded bg-warn" />
                <span className="h-1 flex-1 rounded bg-warn" />
                <span className="h-1 flex-1 rounded bg-warn" />
                <span className="h-1 flex-1 rounded bg-overlay" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-line pb-3">
            <h2 className="text-xl font-bold">How a task moves</h2>
            <p className="text-sm text-muted">
              Four steps, always in this order.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(function (s, i) {
              return (
                <li key={i} className="flex flex-col gap-3 bg-surface p-5">
                  <span className="text-mark" aria-hidden="true">
                    {s.mark}
                  </span>
                  <span className="font-bold">{s.who}</span>
                  <span className="text-sm text-muted">{s.text}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-line pb-3">
            <h2 className="text-xl font-bold">Three roles, three dashboards</h2>
            <p className="text-sm text-muted">
              Everyone sees only what their job needs.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-3">
            {ROLES.map(function (r) {
              return (
                <article
                  key={r.name}
                  className="flex flex-col gap-4 bg-raised p-5"
                >
                  <div>
                    <h3 className="font-bold">{r.name}</h3>
                    <p className="text-sm text-faint">{r.line}</p>
                  </div>
                  <ul className="flex flex-col gap-2 text-sm text-muted">
                    {r.can.map(function (c) {
                      return (
                        <li key={c} className="flex gap-2">
                          <span className="text-mark" aria-hidden="true">
                            [&gt;]
                          </span>
                          <span>{c}</span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-line pb-3">
            <h2 className="text-xl font-bold">Built to be strict</h2>
          </div>
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {FEATURES.map(function (f) {
              return (
                <div key={f.title} className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-2 font-bold">
                    <span className="text-mark" aria-hidden="true">
                      [#]
                    </span>
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted">{f.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-line pb-3">
            <h2 className="text-xl font-bold">See it in use</h2>
          </div>
          {/* TODO: replace this box with a real screenshot of the admin dashboard */}
          <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded border border-dashed border-line-strong bg-surface p-6 text-center">
            <span className="text-mark" aria-hidden="true">
              [ ]
            </span>
            <p className="text-muted">Dashboard screenshot goes here.</p>
            <p className="text-xs text-faint">Suggested size: 1600 x 900</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-line pb-3">
            <h2 className="text-xl font-bold">Get in touch</h2>
            <p className="text-sm text-muted">
              Questions, feedback or the source code.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIALS.map(function (s) {
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded border border-line bg-raised px-4 py-3 transition-colors duration-200 hover:border-line-strong hover:bg-overlay"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="font-bold">{s.name}</span>
                    <span className="truncate text-sm text-faint">
                      {s.handle}
                    </span>
                  </div>
                  <span
                    className="text-mark transition-colors duration-200 group-hover:text-primary"
                    aria-hidden="true"
                  >
                    [&gt;]
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-sunken">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-faint">
          <span className="flex items-center gap-2">
            <span className="text-mark" aria-hidden="true">
              [#]
            </span>
            Task manager
          </span>
          <span>Built with React, Express and MongoDB.</span>
        </div>
      </footer>
    </div>
  );
}
