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
            <div
              key={t.id}
              className={`toast ${TYPE_CLASS[t.type] ?? ""} flex justify-between items-start gap-3`}
            >
              <span>{t.message}</span>
              <button
                type="button"
                className="muted cursor-pointer"
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
