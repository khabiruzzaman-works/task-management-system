import { createContext, useContext, useState, useCallback } from "react";

const toast_context = createContext(null);

export function useToast() {
  return useContext(toast_context);
}

const TYPE_STYLE = {
  error: "border-alert/50 text-alert",
  success: "border-clear/40 text-clear",
  info: "border-info/40 text-info",
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

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-[340px] max-w-[90vw]">
        {toasts.map(function (t) {
          return (
            <div
              key={t.id}
              className={`bg-plate border rounded-sm px-4 py-2 text-caption-md leading-normal flex justify-between items-start gap-3 ${TYPE_STYLE[t.type]}`}
            >
              <span>{t.message}</span>
              <button
                type="button"
                className="text-dim hover:text-parchment"
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
