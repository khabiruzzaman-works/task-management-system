import { useState } from "react";

export default function Signup() {
  const { worker, set_worker } = useState({});

  function input_handler(e) {
    set_worker(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function form_handler(e) {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={form_handler}>
        <input
          type="email"
          name="email"
          value={worker.email}
          onChange={input_handler}
          required
        />
        <input
          type="text"
          name="username"
          value={worker.username}
          onChange={input_handler}
          required
        />
        <input
          type="text"
          name="firstname"
          value={worker.firstname}
          onChange={input_handler}
          required
        />
        <input
          type="text"
          name="lastname"
          value={worker.lastname}
          onChange={input_handler}
        />
        <input
          type="password"
          name="password"
          value={worker.password}
          onChange={input_handler}
          required
        />

        <button type="submit" >Signup</button>
      </form>
    </>
  );
}
