import { useState } from "react";
import { useAuth } from "../../../context/Auth.context";
import { useEmployee } from "../../../context/Employee.context";
import { useToast } from "../../../context/Notify.context";
import promotion_controller from "../controller/promotion.controller";
import demotion_controller from "../controller/demotion.controller";
import Buttons from "../../../components/buttons/buttons";
import { Navigate, useNavigate } from "react-router-dom";
import Loading_screen from "../../../components/pages/Loading_screen";

export default function Employees_admin() {
  const { user, user_loading } = useAuth();
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [submitting_email, set_submitting_email] = useState(null);
  if (user_loading || employee_loading) {
    return <Loading_screen />;
  }

  async function promote_handler(email) {
    set_submitting_email(email);
    const result = await promotion_controller(email);
    set_submitting_email(null);

    if (!result.success) {
      return notify(result.message, "error");
    }
    refresh_employee();
    notify(result.message, "success");
  }
  async function demote_handler(email) {
    set_submitting_email(email);
    const result = await demotion_controller(email);
    set_submitting_email(null);

    if (!result.success) {
      return notify(result.message, "error");
    }
    await refresh_employee();
    notify(result.message, "success");
  }

  return (
    <>
      <div className="flex gap-2 w-full justify-end border-b py-3 px-3.5">
        <Buttons
          size="md"
          text={"Register worker"}
          onClick={function () {
            navigate("/admin/employees/register", { replace: true });
          }}
        />
        <Buttons
          variant="secondary"
          size="md"
          text={"Assign worker"}
          onClick={function () {
            navigate("/admin/employees/assign-worker", { replace: true });
          }}
        />
      </div>
      {employee.length === 0 && (
        <>
          <div className="w-full min-h-screen flex justify-items-center justify-center">
            <span className="text-primary text-xl"> No employee</span>
          </div>
        </>
      )}
      {employee.map(function (em) {
        return (
          <div key={em?._id} className="w-full flex justify-between mb-3">
            <div>
              <span className="text-primary text-sm">{em?.name}</span>
            </div>
            <div className="flex gap-1.5">
              <Buttons
                text="Promote"
                load_state={submitting_email === em?.email}
                disabled={
                  submitting_email === em?.email || em?.role === "manager"
                }
                loading="Promoting"
                onClick={function () {
                  promote_handler(em?.email);
                }}
              />
              <Buttons
                text="Demote"
                load_state={submitting_email === em?.email}
                disabled={
                  submitting_email === em?.email || em?.role === "worker"
                }
                loading="Demoting"
                onClick={function () {
                  demote_handler(em?.email);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
