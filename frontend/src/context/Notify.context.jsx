import { createContext, useContext, useState, useCallback } from "react";

const toast_context = createContext(null);

export function useToast() {
  return useContext(toast_context);
}

const TYPE_CLASS = {
  error: "toast-error",
  success: "toast-success",
  info: "toast-info",
};

const TYPE_MARK = {
  error: "[!]",
  success: "[x]",
  info: "[#]",
};

export function Toast_Provider({ children }) {
  const [toasts, set_toasts] = useState([]);

  const remove = useCallback(function (id) {
    set_toasts(function (prev) {
      return prev.filter(function (t) {
        return t.id !== id;
      });
    });
  }, []);

  const notify = useCallback(
    function (message, type = "error") {
      const id = crypto.randomUUID();
      set_toasts(function (prev) {
        return [...prev, { id, message: String(message), type }];
      });
      setTimeout(function () {
        remove(id);
      }, 4000);
    },
    [remove],
  );

  return (
    <toast_context.Provider value={{ notify }}>
      {children}

      <div className="toast-area" role="status" aria-live="polite">
        {toasts.map(function (t) {
          return (
            <div key={t.id} className={`toast ${TYPE_CLASS[t.type] ?? ""}`}>
              <span aria-hidden="true">{TYPE_MARK[t.type] ?? "[#]"}</span>
              <span className="toast-text">{t.message}</span>
              <button
                type="button"
                className="toast-close"
                aria-label="dismiss"
                onClick={function () {
                  remove(t.id);
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </toast_context.Provider>
  );
}
