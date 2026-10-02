import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin/layout/Admin.jsx";
import Worker from "./pages/worker/layout/Worker.jsx";
import Login from "./pages/authentication/layout/Login.jsx";

import { Auth_Provider } from "./context/Auth.context.jsx";
import Admin_protected_route from "./pages/admin/layout/Admin_protected.jsx";
import Register_worker from "./pages/admin/layout/Register_worker.jsx";
import Task_creation from "./pages/admin/layout/Task_creation.jsx";
import Promotion from "./pages/admin/layout/Promotion.jsx";
import Demotion from "./pages/admin/layout/Demotion.jsx";
import Assign_worker from "./pages/admin/layout/Assign_worker.jsx";
import Auth_protected_route from "./pages/admin/layout/auth_protected.jsx";
import Pass_change from "./pages/admin/layout/Pass_change.jsx";
import Manager from "./pages/manager/layout/Manager.jsx";

export default function App() {
  return (
    <>
      <Auth_Provider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login />}></Route>
            <Route path={"/login"} element={<Login />}></Route>

            <Route element={<Auth_protected_route />}>
              <Route path={"/manager"} element={<Manager />}></Route>
              <Route path={"/worker"} element={<Worker />}></Route>
              <Route
                path={"/change-password"}
                element={<Pass_change />}
              ></Route>
            </Route>

            <Route element={<Admin_protected_route />}>
              <Route path={"/admin"} element={<Admin />}></Route>
              <Route
                path={"/register-worker"}
                element={<Register_worker />}
              ></Route>
              <Route
                path={"/task-creation"}
                element={<Task_creation />}
              ></Route>
              <Route path={"/promote"} element={<Promotion />}></Route>
              <Route path={"/demote"} element={<Demotion />}></Route>
              <Route
                path={"/assign-worker"}
                element={<Assign_worker />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Auth_Provider>
    </>
  );
}
