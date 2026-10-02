import { useState } from "react";
import pass_change_controller from "../controller/pass_change.controller";
import { useAuth } from "../../../context/Auth.context";
import { useNavigate } from "react-router-dom";

export default function Pass_change() {
  const [old_password, set_old_Pasword] = useState("");
  const [new_password, set_new_password] = useState("");
  const [new_password_again, set_new_password_again] = useState("");
  const { user, access_token } = useAuth();
  const max_length = 72;
  const min_length = 8;
  const navigate = useNavigate();

  async function password_changer() {
    if (
      new_password.length < min_length ||
      new_password_again.length < min_length ||
      new_password.length > max_length ||
      new_password_again.length > max_length
    ) {
      return console.log("password has to be between 8 and 72 chars");
    }

    const is_new_pass_correct = new_password === new_password_again;
    if (!is_new_pass_correct) {
      return console.log("both new password has to be the same");
    }
    const data = await pass_change_controller(
      new_password,
      old_password,
      access_token,
    );

    if (!data.success) {
      return console.log("couldn't change the pass from frontend");
    }

    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "manager") {
      navigate("/manager");
    } else {
      navigate("/worker");
    }
  }

  return (
    <>
      <div>
        <div>
          <label>Old Password</label>
          <input
            type="password"
            name="old_password"
            value={old_password}
            className=""
            onChange={function (e) {
              set_old_Pasword(e.target.value);
            }}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="new_password"
            value={new_password}
            className=""
            onChange={function (e) {
              set_new_password(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Retype New Password</label>
          <input
            type="password"
            name="new_password_again"
            value={new_password_again}
            className=""
            onChange={function (e) {
              set_new_password_again(e.target.value);
            }}
          />
        </div>

        <button onClick={password_changer} className="">
          change Password
        </button>
      </div>
    </>
  );
}
