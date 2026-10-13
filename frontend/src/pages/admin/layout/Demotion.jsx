import { useState } from "react";
import { useEmployee } from "../../../context/Employee.context";
import { useNavigate } from "react-router-dom";
import demotion_controller from "../controller/demotion.controller";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/Loading_screen";

export default function Demotion() {
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const [demoting_email, set_demoting_email] = useState(null);
  const navigate = useNavigate();
  const { notify } = useToast();

  async function demote_handler(email) {
    set_demoting_email(email);
    const result = await demotion_controller(email);
    set_demoting_email(null);

    if (!result.success) {
      return notify(result.message, "error");
    }
    await refresh_employee();
    notify(result.message, "success");
  }

  if (employee_loading) {
    return <Loading_screen />;
  }

  const managers = employee.filter(function (user) {
    return user.role === "manager";
  });

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: "700px" }}>
        <header className="page-header">
          <h1>Demote manager</h1>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => navigate("/admin")}
          >
            back
          </button>
        </header>

        <div className="flex flex-col gap-3">
          {managers.length === 0 && (
            <div className="empty">
              <p className="empty-title">No managers to demote.</p>
            </div>
          )}

          {managers.map(function (manager) {
            return (
              <div
                key={manager._id}
                className="card flex justify-between items-center gap-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate">{manager.name}</h3>
                  <p className="muted text-sm truncate">{manager.email}</p>
                </div>

                <div className="row shrink-0">
                  <span className="tag">{manager.role}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={demoting_email === manager.email}
                    onClick={function () {
                      demote_handler(manager.email);
                    }}
                  >
                    {demoting_email === manager.email ? "Demoting..." : "Demote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
