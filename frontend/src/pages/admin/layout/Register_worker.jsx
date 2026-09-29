import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth.context.jsx";
import { register_worker_controller } from "../../authentication/controller/register.controller.js";


export default function Register_worker() {
  const navigate = useNavigate();
  const [worker, set_worker] = useState({});
  const { user, set_user, access_token, set_access_token, loading } = useAuth();

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function form_handler(e) {
    e.preventDefault();
    const stat = await register_worker_controller(worker, access_token);
    console.log(stat.user);
    console.log(stat.message);

    navigate("/admin");

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
                Worker's name
              </label>
              <input
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 rounded-xl px-4 py-3 text-sm transition-all duration-200"
                type="text"
                name="name"
                placeholder="Worker's name"
                value={worker.name}
                onChange={input_handler}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-500 px-1">
                Worker's Email
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
            Register a worker
          </button>
        </form>
      </div>
    </>
  );
}
