import { useState } from "react";
import { useEmployee } from "../../../context/Employee.context";
import promotion_controller from "../controller/promotion.controller";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/Loading_screen";

export default function Promotion() {
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const [promoting_email, set_promoting_email] = useState(null);
  const navigate = useNavigate();
  const { notify } = useToast();
  if (employee_loading) {
    return <Loading_screen />;
  }

  async function promote_handler(email) {
    set_promoting_email(email);
    const result = await promotion_controller(email);
    set_promoting_email(null);

    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_employee();
    notify(result.message, "success");
  }

  const workers = employee.filter(function (worker) {
    return worker.role === "worker";
  });

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: "700px" }}>
        <header className="page-header">
          <h1>Promote worker</h1>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => navigate("/admin")}
          >
            back
          </button>
        </header>

        <div className="flex flex-col gap-3">
          {workers.length === 0 && (
            <div className="empty">
              <p className="empty-title">No workers to promote.</p>
            </div>
          )}

          {workers.map(function (worker) {
            return (
              <div
                key={worker._id}
                className="card flex justify-between items-center gap-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate">{worker.name}</h3>
                  <p className="muted text-sm truncate">{worker.email}</p>
                </div>

                <div className="row shrink-0">
                  <span className="tag">{worker.role}</span>
                  <button
                    className="btn btn-sm"
                    disabled={promoting_email === worker.email}
                    onClick={function () {
                      promote_handler(worker.email);
                    }}
                  >
                    {promoting_email === worker.email ? "Promoting..." : "Promote"}
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
