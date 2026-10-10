import { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./Auth.context.jsx";
import { useCallback } from "react";
import fetch_handler from "../utils/fetch_handler.js";

const employee_context = createContext(null);

export function useEmployee() {
  return useContext(employee_context);
}

export function Employee_Provider({ children }) {
  const { access_token } = useAuth();
  const [employee, set_employee] = useState([]);
  const [employee_loading, set_employee_loading] = useState(true);

  const refresh_employee = useCallback(
    async function () {
      try {
        const result = await fetch_handler("user/admin/get-employee-list");

        set_employee(result.data.employee_list);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_employee([]);
      } finally {
        set_employee_loading(false);
      }
    },
    [access_token],
  );

  useEffect(
    function () {
      refresh_employee();
    },
    [refresh_employee],
  );

  return (
    <employee_context.Provider
      value={{ employee, employee_loading, refresh_employee }}
    >
      {children}
    </employee_context.Provider>
  );
}
