import { useState } from "react";
import { useEmployee } from "../../../context/Employee.context";
import { useNavigate } from "react-router-dom";
import demotion_controller from "../controller/demotion.controller";
import { useToast } from "../../../context/Notify.context";
import Loading_screen from "../../../components/pages/Loading_screen.jsx";
import Form_head from "../../../components/Form_head";

export default function Demotion() {
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const [demoting_email, set_demoting_email] = useState(null);
  const [submitting, set_submitting] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  async function demote_handler(email) {
    set_demoting_email(email);
    set_submitting(true);
    const result = await demotion_controller(email);
    set_demoting_email(null);
    set_submitting(false);

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
      <div className="container container-medium">
        <Form_head
          eyebrow="Admin / People"
          title="Demote manager"
          description="Demoting a manager makes them a worker."
          on_back={() => navigate("/admin")}
        />

        <div className="section-head">
          <h2>Managers</h2>
          <span className="faint text-sm">{managers.length} total</span>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          {managers.length === 0 && (
            <div className="empty">
              <p className="empty-mark">[ ]</p>
              <p className="empty-title">No managers to demote.</p>
            </div>
          )}

          {managers.map(function (manager) {
            return (
              <div key={manager._id} className="card person">
                <div className="person-main">
                  <span className="avatar avatar-lg" aria-hidden="true">
                    {(manager.name || "?").trim().charAt(0)}
                  </span>
                  <div>
                    <h3 className="truncate">{manager.name}</h3>
                    <p className="muted text-sm truncate">{manager.email}</p>
                  </div>
                </div>

                <div className="row">
                  <span className="tag">{manager.role}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={demoting_email === manager.email}
                    onClick={function () {
                      demote_handler(manager.email);
                    }}
                  >
                    {demoting_email === manager.email
                      ? "Demoting..."
                      : "Demote"}
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
