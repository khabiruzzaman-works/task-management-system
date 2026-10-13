import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register_worker_controller } from "../controller/register.controller.js";
import { useEmployee } from "../../../context/Employee.context.jsx";
import { useToast } from "../../../context/Notify.context.jsx";

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
    navigate("/admin");
  }
  return (
    <main className="page">
      <div className="container container-narrow">
        <header className="page-header">
          <h1>Register worker</h1>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={function () {
              navigate("/admin");
            }}
          >
            back
          </button>
        </header>

        <form onSubmit={form_handler} className="card stack">
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

          <div className="row justify-end">
            <button
              type="button"
              className="btn btn-md btn-ghost"
              onClick={function () {
                navigate("/admin");
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
    </main>
  );
}
