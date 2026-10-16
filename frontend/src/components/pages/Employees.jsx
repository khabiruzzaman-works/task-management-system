import { useState } from "react";
import { useAuth } from "../../context/Auth.context";
import { useEmployee } from "../../context/Employee.context";
import Buttons from "../buttons/buttons";
import Loading_screen from "./Loading_screen";
import promotion_controller from "../../pages/admin/controller/promotion.controller";
import demotion_controller from "../../pages/admin/controller/demotion.controller";
import { useToast } from "../../context/Notify.context";
import { useWorker } from "../../context/Worker.context";

export default function Employees() {
  const { user, user_Loading } = useAuth();
  const { employee, employee_loading, refresh_employee } = useEmployee();
  const { worker, worker_loading,refresh_worker } = useWorker();
  const { notify } = useToast();
  const [submitting_email, set_submitting_email] = useState(null);
  if (user_Loading || employee_loading || worker_loading) {
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
      {user.role === "admin" &&
        employee.map(function (em) {
          return (
            <>
              <div className="w-full flex justify-between">
                <div>
                  <span className="text-primary text-sm">{em?.name}</span>
                </div>
                <div className="flex gap-1.5">
                  <Buttons
                    text="Promote"
                    load_state={submitting_email === em?.email}
                    disabled={submitting_email === em?.email || em?.role === "manager"}
                    loading="Promoting"
                    onClick={function () {
                      promote_handler(em?.email);
                    }}
                  />
                  <Buttons
                    text="Demote"
                    load_state={submitting_email === em?.email}
                    disabled={submitting_email === em?.email || em?.role === "worker"}
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
      {user.role === "manager" &&
        worker.map(function (wo) {
          return (
            <>
              <div className="w-full flex mb-3">
                <span className="text-primary text-sm">{wo?.name}</span>
              </div>
            </>
          );
        })}
    </>
  );
}
