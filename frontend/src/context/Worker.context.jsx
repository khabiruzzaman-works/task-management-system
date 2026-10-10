import { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./Auth.context.jsx";
import { useCallback } from "react";
import fetch_handler from "../utils/fetch_handler.js";

const worker_context = createContext(null);

export function useWorker() {
  return useContext(worker_context);
}

export function Worker_Provider({ children }) {
  const { access_token } = useAuth();
  const [worker, set_worker] = useState([]);
  const [worker_loading, set_worker_loading] = useState(true);

  const refresh_worker = useCallback(
    async function () {
      try {
        const result = await fetch_handler("user/manager/get_worker-list");
        set_worker(result.data.worker_list);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_worker([]);
      } finally {
        set_worker_loading(false);
      }
    },
    [access_token],
  );

  useEffect(
    function () {
      refresh_worker();
    },
    [refresh_worker],
  );

  return (
    <worker_context.Provider value={{ worker, worker_loading, refresh_worker }}>
      {children}
    </worker_context.Provider>
  );
}
