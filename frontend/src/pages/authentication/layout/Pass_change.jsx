import { useState } from "react";
import pass_change_controller from "../controller/pass_change.controller";
import { useAuth } from "../../../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

export default function Pass_change() {
  const [current_password, set_current_password] = useState("");
  const [new_password, set_new_password] = useState("");
  const [new_password_again, set_new_password_again] = useState("");
  const [submitting, set_submitting] = useState(false);
  const {set_user, user, user_loading } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  if (user_loading) {
    return <Loading_screen />;
  }

  const max_length = 72;
  const min_length = 8;

  function go_back() {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "manager") {
      navigate("/manager/dashboard");
    } else {
      navigate("/worker/dashboard");
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
    set_user(null);
    navigate("/login", { replace: true });
    notify(result.message, "success");
  }

  return (

      <div className="container container-narrow">
      <Buttons variant="ghost" text={"Back to panel"} onClick={go_back} />

        <form onSubmit={password_changer} className="card form-card">
          <div className="form-body">
            <div>
              <label className="label label-caps" htmlFor="current_password">
                old password
              </label>
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

            <div className="form-split">
              <div>
                <label className="label label-caps" htmlFor="new_password">
                  new password
                </label>
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
                <label
                  className="label label-caps"
                  htmlFor="new_password_again"
                >
                  retype new password
                </label>
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
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-md btn-ghost"
              onClick={go_back}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-md btn-primary"
              disabled={submitting}
            >
              {submitting ? "Changing..." : "Change password"}
            </button>
          </div>
        </form>
      </div>

  );
}
