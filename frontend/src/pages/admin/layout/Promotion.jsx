import { useState } from "react";
import { useEmployee } from "../../../context/Employee.context";
import promotion_controller from "../controller/promotion.controller";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Form_head from "../../../components/Form_head";

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
      <div className="container container-medium">
        <Form_head
          eyebrow="Admin / People"
          title="Promote worker"
          description="Promoting a worker makes them a manager."
          on_back={() => navigate("/admin")}
        />

        <div className="section-head">
          <h2>Workers</h2>
          <span className="faint text-sm">{workers.length} total</span>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          {workers.length === 0 && (
            <div className="empty">
              <p className="empty-mark">[ ]</p>
              <p className="empty-title">No workers to promote.</p>
            </div>
          )}

          {workers.map(function (worker) {
            return (
              <div key={worker._id} className="card person">
                <div className="person-main">
                  <span className="avatar avatar-lg" aria-hidden="true">
                    {(worker.name || "?").trim().charAt(0)}
                  </span>
                  <div>
                    <h3 className="truncate">{worker.name}</h3>
                    <p className="muted text-sm truncate">{worker.email}</p>
                  </div>
                </div>

                <div className="row">
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
