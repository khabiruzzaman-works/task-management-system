import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useAuth } from "./Auth.context.jsx";
import fetch_handler from "../utils/fetch_handler.js";

const task_context = createContext(null);

export function useTaskCenter() {
  return useContext(task_context);
}

export function Tasks_Provider({ children }) {
  const { access_token } = useAuth();
  const [tasks, set_tasks] = useState([]);
  const [task_loading, set_task_loading] = useState(true);

  const refresh_tasks = useCallback(
    async function () {
      try {
        const result = await fetch_handler("task/get-tasks");
        set_tasks(result.data.tasks);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_tasks([]);
      } finally {
        set_task_loading(false);
      }
    },
    [access_token],
  );

  useEffect(
    function () {
      refresh_tasks();
    },
    [refresh_tasks],
  );

  return (
    <task_context.Provider value={{ tasks, task_loading, refresh_tasks }}>
      {children}
    </task_context.Provider>
  );
}
