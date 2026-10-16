import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Admin,
  Worker,
  Login,
  Auth_Provider,
  Admin_protected_route,
  Register_worker,
  Task_creation,
  Promotion,
  Demotion,
  Assign_worker,
  Auth_protected_route,
  Pass_change,
  Manager,
  Manager_protected_route,
  Worker_protected_route,
  No_user_protected_route,
  Edit_task_as_worker,
  Edit_task_as_manager,
  Edit_task_as_admin,
  Toast_Provider,
  Not_found,
  Home,
  Dashboard,
  Tasks,
  Employees_admin,
  Employees_manager,
} from "./index.js";

export default function App() {
  return (
    <>
      <Toast_Provider>
        <Auth_Provider>
          <BrowserRouter>
            <Routes>
              <Route element={<No_user_protected_route />}>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
              </Route>

              <Route element={<Auth_protected_route />}>
                <Route element={<Manager_protected_route />}>
                  <Route path={"/manager"} element={<Manager />}>
                    <Route path="/manager/dashboard" element={<Dashboard />} />
                    <Route path="/manager/task" element={<Tasks />} />
                    <Route path="/manager/employees" element={<Employees_manager />} />
                  </Route>
                    <Route path={"/manager/task/edit/:task_id"} element={<Edit_task_as_manager />} />
                </Route>
                <Route element={<Worker_protected_route />}>
                  <Route path={"/worker"} element={<Worker />}>
                    <Route path="/worker/dashboard" element={<Dashboard />} />
                    <Route path="/worker/task" element={<Tasks />} />
                  </Route>
                  <Route
                    path={"/worker/task/edit/:task_id"}
                    element={<Edit_task_as_worker />}
                  ></Route>
                </Route>
                <Route
                  path={"/change-password"}
                  element={<Pass_change />}
                ></Route>

                <Route element={<Admin_protected_route />}>
                  <Route path={"/admin"} element={<Admin />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/task" element={<Tasks />} />
                    <Route
                      path="/admin/employees"
                      element={<Employees_admin />}
                    />
                  </Route>
                  <Route
                    path={"/register-worker"}
                    element={<Register_worker />}
                  ></Route>
                  <Route
                    path={"/task-creation"}
                    element={<Task_creation />}
                  ></Route>
                  <Route
                    path={"/admin/task/edit/:task_id"}
                    element={<Edit_task_as_admin />}
                  ></Route>
                  <Route path={"/promote"} element={<Promotion />}></Route>
                  <Route path={"/demote"} element={<Demotion />}></Route>
                  <Route
                    path={"/assign-worker"}
                    element={<Assign_worker />}
                  ></Route>
                </Route>
              </Route>
              <Route path={"*"} element={<Not_found />}></Route>
            </Routes>
          </BrowserRouter>
        </Auth_Provider>
      </Toast_Provider>
    </>
  );
}
