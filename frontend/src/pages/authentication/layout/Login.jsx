import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_controller } from "../controller/login.controller.js";
import { useAuth } from "../../../context/Auth.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [worker, set_worker] = useState({ email: "", password: "" });

  const { set_user, set_access_token_globally, user_loading } = useAuth();
  const { notify } = useToast();

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  if (user_loading) {
    return <Loading_screen />;
  }

  async function form_handler(e) {
    e.preventDefault();
    const result = await login_controller(worker);
    if (!result.success) {
      return notify(result.message, "error");
    }

    set_user(result.data.user);
    set_access_token_globally(result.data.accessToken);

    if (result.data.user?.role === "admin") {
      navigate("/admin");
    } else if (result.data.user?.role === "manager") {
      navigate("/manager");
    } else {
      navigate("/worker");
    }
  }
  return (
    <main className="auth">
      <section className="auth-brand">
        <div>
          <span className="brand">
            <span className="brand-mark">[#]</span>
            Task manager
          </span>
        </div>

        <div className="stack">
          <p className="eyebrow">How work moves</p>
          <h2>Every task, one clear path.</h2>
          <ol className="auth-flow">
            <li>
              <span>[+]</span>
              <span>
                <strong>Admin</strong> creates a task and picks a manager.
              </span>
            </li>
            <li>
              <span>[&gt;]</span>
              <span>
                <strong>Manager</strong> gives it to a worker on their team.
              </span>
            </li>
            <li>
              <span>[&gt;]</span>
              <span>
                <strong>Worker</strong> does the work and submits it.
              </span>
            </li>
            <li>
              <span>[x]</span>
              <span>
                <strong>Admin</strong> reviews it and approves or rejects.
              </span>
            </li>
          </ol>
        </div>

        <p className="faint text-xs auth-brand-note">
          Accounts are created by your admin. There is no public sign up.
        </p>
      </section>

      <section className="auth-panel">
        <div className="auth-card stack">
          <div>
            <h1>Log in</h1>
            <p className="muted">Log in to continue.</p>
          </div>

          <form onSubmit={form_handler} className="card form-card">
            <div className="form-body">
              <div>
                <label className="label label-caps" htmlFor="email">
                  email
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  name="email"
                  placeholder="*****@kr.org"
                  value={worker.email}
                  onChange={input_handler}
                  required
                />
              </div>

              <div>
                <label className="label label-caps" htmlFor="password">
                  password
                </label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={worker.password}
                  onChange={input_handler}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-md btn-primary">
                Log in
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
