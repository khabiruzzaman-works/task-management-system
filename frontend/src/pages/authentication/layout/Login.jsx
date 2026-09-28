import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_controller } from "../controller/login.controller";

export default function Login() {
  const navigate = useNavigate();
  const [worker, set_worker] = useState({});

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function form_handler(e) {
    e.preventDefault();
    const stat = await login_controller(worker);
    if (stat.success) {
      const is_admin = stat.user?.role === "admin";
      is_admin ? navigate("/admin") : navigate("/worker");
    }
    console.log("yay");

    return console.log(`${stat.message}`);
  }
  return (
    <>
      <div className="bg-zinc-950 w-full min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={form_handler}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-500 px-1">
                Email
              </label>
              <input
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 rounded-xl px-4 py-3 text-sm transition-all duration-200"
                type="email"
                name="email"
                placeholder="*****@kr.org"
                value={worker.email}
                onChange={input_handler}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-500 px-1">
                Password
              </label>

              <input
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 rounded-xl px-4 py-3 text-sm transition-all duration-200"
                type="password"
                name="password"
                placeholder="••••••••"
                value={worker.password}
                onChange={input_handler}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-zinc-800 border border-zinc-800 text-zinc-300 hover:bg-transparent hover:border-zinc-700 rounded-xl py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer active:scale-[0.98] mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
