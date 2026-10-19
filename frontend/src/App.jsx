import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {
  Admin,
  Worker,
  Login,
  Auth_Provider,
  Admin_protected_route,
  Register_worker,
  Task_creation,
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
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="/manager/dashboard" element={<Dashboard />} />
                    <Route path={"/manager/profile/change-password"} element={<Pass_change />} />
                    <Route path="/manager/tasks" element={<Tasks />} />
                    <Route path="/manager/employees" element={<Employees_manager />} />
                    <Route path={"/manager/tasks/edit/:task_id"} element={<Edit_task_as_manager />} />
                  </Route>
                </Route>

                <Route element={<Worker_protected_route />}>
                  <Route path={"/worker"} element={<Worker />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="/worker/dashboard" element={<Dashboard />} />
                    <Route path={"/worker/profile/change-password"} element={<Pass_change />} />
                    <Route path="/worker/tasks" element={<Tasks />} />
                    <Route path="/worker/tasks/edit/:task_id" element={<Edit_task_as_worker />} />
                  </Route>
                </Route>

                <Route element={<Admin_protected_route />}>
                  <Route path={"/admin"} element={<Admin />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path={"/admin/profile/change-password"} element={<Pass_change />} />
                    <Route path="/admin/tasks" element={<Tasks />} />
                    <Route path="/admin/tasks/create" element={<Task_creation />} />
                    <Route path="/admin/tasks/edit/:task_id" element={<Edit_task_as_admin />} />
                    <Route path="/admin/employees" element={<Employees_admin />} />
                    <Route path="/admin/employees/register" element={<Register_worker />} />
                    <Route path="/admin/employees/assign-worker" element={<Assign_worker />} />
                  </Route>
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
