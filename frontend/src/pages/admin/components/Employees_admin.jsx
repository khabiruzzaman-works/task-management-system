import { useState } from "react";
import { useAuth } from "../../../context/Auth.context";
import { useEmployee } from "../../../context/Employee.context";
import { useToast } from "../../../context/Notify.context";
import promotion_controller from "../controller/promotion.controller";
import demotion_controller from "../controller/demotion.controller";

export default function Employees_admin() {
  const { user, user_Loading } = useAuth();
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const { notify } = useToast();
  const [submitting_email, set_submitting_email] = useState(null);
  if (user_Loading || employee_loading) {
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
      {employee.length === 0 && (
        <>
          <div className="w-full min-h-screen flex justify-items-center justify-center">
            <span className="text-primary text-xl"> No employee</span>
          </div>
        </>
      )}
      {employee.map(function (em) {
        return (
          <>
            <div className="w-full flex justify-between mb-3">
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
                    promote_handler(em?.email);
                  }}
                />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
