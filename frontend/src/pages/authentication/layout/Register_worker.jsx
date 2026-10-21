import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register_worker_controller } from "../controller/register.controller.js";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";
import Buttons from "../../../components/buttons/buttons.jsx";

export default function Register_worker() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [form, set_form] = useState({ name: "", email: "", password: "" });
  const { refresh_employee } = useEmployee();

  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function form_handler(e) {
    e.preventDefault();
    const result = await register_worker_controller(form);
    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_employee();
    notify(result.message, "success");
    navigate("/admin/employees");
  }
  return (

      <div className="w-full flex flex-col">
        <Buttons variant="ghost" size="sm" text={"Back to panel"} onClick={function(){navigate("/admin/employees",{replace:true})}} />
        <form onSubmit={form_handler} className="card form-card">
          <div className="form-body">
            <div>
              <label className="label label-caps" htmlFor="name">worker's name</label>
              <input
                id="name"
                className="input"
                type="text"
                name="name"
                placeholder="Worker's name"
                value={form.name}
                onChange={input_handler}
                required
              />
            </div>

            <div>
              <label className="label label-caps" htmlFor="email">worker's email</label>
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                placeholder="*****@kr.org"
                value={form.email}
                onChange={input_handler}
                required
              />
              <p className="hint">Only emails on your organisation's domain can log in.</p>
            </div>

            <div>
              <label className="label label-caps" htmlFor="password">password</label>
              <input
                id="password"
                className="input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={input_handler}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-md btn-ghost"
              onClick={function () {
                navigate("/admin/employees");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-md btn-primary">
              Register worker
            </button>
          </div>
        </form>
      </div>

  );
}
