import { useState } from "react";
import pass_change_controller from "../controller/pass_change.controller";
import { useAuth } from "../../../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/Loading_screen";

export default function Pass_change() {
  const [current_password, set_current_password] = useState("");
  const [new_password, set_new_password] = useState("");
  const [new_password_again, set_new_password_again] = useState("");
  const [submitting, set_submitting] = useState(false);
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  if (user_loading) {
    return <Loading_screen />;
  }

  const max_length = 72;
  const min_length = 8;

  function go_back() {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "manager") {
      navigate("/manager");
    } else {
      navigate("/worker");
    }
  }

  async function password_changer(e) {
    e.preventDefault();
    if (
      new_password.length < min_length ||
      new_password_again.length < min_length ||
      new_password.length > max_length ||
      new_password_again.length > max_length
    ) {
      return notify("password has to be between 8 and 72 chars", "error");
    }

    const is_new_pass_correct = new_password === new_password_again;
    if (!is_new_pass_correct) {
      return notify("both new password has to be the same", "error");
    }

    set_submitting(true);
    const result = await pass_change_controller(new_password, current_password);
    set_submitting(false);

    if (!result.success) {
      return notify(result.message, "error");
    }

    notify(result.message, "success");
    go_back();
  }

  return (
    <main className="page">
      <div className="container container-narrow">
        <header className="page-header">
          <h1>Change password</h1>
          <button type="button" className="btn btn-sm btn-ghost" onClick={go_back}>
            back
          </button>
        </header>

        <form onSubmit={password_changer} className="card stack">
          <div>
            <label className="label label-caps" htmlFor="current_password">old password</label>
            <input
              id="current_password"
              className="input"
              type="password"
              name="current_password"
              placeholder="••••••••"
              value={current_password}
              onChange={function (e) {
                set_current_password(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label className="label label-caps" htmlFor="new_password">new password</label>
            <input
              id="new_password"
              className="input"
              type="password"
              name="new_password"
              placeholder="8 to 72 characters"
              value={new_password}
              onChange={function (e) {
                set_new_password(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label className="label label-caps" htmlFor="new_password_again">retype new password</label>
            <input
              id="new_password_again"
              className="input"
              type="password"
              name="new_password_again"
              placeholder="••••••••"
              value={new_password_again}
              onChange={function (e) {
                set_new_password_again(e.target.value);
              }}
              required
            />
          </div>

          <div className="row justify-end">
            <button type="button" className="btn btn-md btn-ghost" onClick={go_back}>
              Cancel
            </button>
            <button type="submit" className="btn btn-md btn-primary" disabled={submitting}>
              {submitting ? "Changing..." : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
