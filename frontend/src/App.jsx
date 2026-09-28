import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin/layout/Admin.jsx";
import Worker from "./pages/worker/layout/Worker.jsx";
import Login from "./pages/authentication/layout/Login.jsx";
import Signup from "./pages/authentication/layout/Signup.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/test"} element={<div className="bg-gray-500 text-7xl">hi</div>}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/admin"} element={<Admin />}></Route>
          <Route path={"/worker"} element={<Worker />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
