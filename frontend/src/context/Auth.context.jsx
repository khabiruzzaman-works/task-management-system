import { useState, useEffect, useContext, createContext } from "react";
import {
  config_access,
  set_fetch_access_token,
  refresh_token,
} from "../utils/fetch_handler.js";

const auth_context = createContext(null);

export function useAuth() {
  return useContext(auth_context);
}

export function Auth_Provider({ children }) {
  const [user, set_user] = useState(null);
  const [access_token, set_access_token] = useState(null);
  const [user_loading, set_user_loading] = useState(true);
  function set_access_token_globally(token) {
    set_fetch_access_token(token);
    set_access_token(token);
  }

  useEffect(function () {
    config_access({
      session_cut: function () {
        set_access_token(null);
        set_user(null);
      },
      session_loaded: function (token, refreshed_user) {
        set_access_token_globally(token);
        set_user(refreshed_user);
      },
    });
  }, []);

  useEffect(function () {
    async function restore() {
      try {
        const data = await refresh_token();
        set_user(data.user);
        set_access_token_globally(data.accessToken);
      } catch (error) {
        console.log("refresh failed:", error.message);
        set_user(null);
        set_access_token_globally(null);
      } finally {
        set_user_loading(false);
      }
    }
    restore();
  }, []);

  return (
    <auth_context.Provider
      value={{
        user,
        set_user,
        access_token,
        set_access_token_globally,
        user_loading,
      }}
    >
      {children}
    </auth_context.Provider>
  );
}
