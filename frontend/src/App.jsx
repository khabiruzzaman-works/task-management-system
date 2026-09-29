import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin/layout/Admin.jsx";
import Worker from "./pages/worker/layout/Worker.jsx";
import Login from "./pages/authentication/layout/Login.jsx";
import Signup from "./pages/authentication/layout/Signup.jsx";

import { Auth_Provider } from "./context/Auth.context.jsx";
import Admin_protected_route from "./pages/admin/layout/Admin_protected.jsx";
import Register_worker from "./pages/admin/layout/Register_worker.jsx";

export default function App() {
  return (
    <>
      <Auth_Provider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/worker"} element={<Worker />}></Route>

          <Route element={<Admin_protected_route />}>
            <Route path={"/signup"} element={<Signup />}></Route>
            <Route path={"/admin"} element={<Admin />}></Route>
            <Route
              path={"/register-worker"}
              element={<Register_worker />}
            ></Route>
          </Route>
          </Routes>
        </BrowserRouter>
      </Auth_Provider>
    </>
  );
}
