import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_controller } from "../controller/login.controller.js";
import { useAuth } from "../../../context/Auth.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Loading_screen from "../../../components/Loading_screen.jsx";

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
    <main className="page flex items-center justify-center">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="stack">
          <div>
            <h1>Task manager</h1>
            <p className="muted">Log in to continue.</p>
          </div>

          <form onSubmit={form_handler} className="card stack">
            <div>
              <label className="label label-caps" htmlFor="email">email</label>
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
              <label className="label label-caps" htmlFor="password">password</label>
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

            <div className="row justify-end">
              <button type="submit" className="btn btn-md btn-primary">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
