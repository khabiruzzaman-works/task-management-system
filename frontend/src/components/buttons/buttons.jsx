const button_type = {
  primary:"bg-accent text-on-accent border-accent font-bold hover:bg-accent/90",
  secondary: "bg-raised text-fg border-line-strong hover:bg-overlay",
  danger:"bg-alert/10 text-alert border-alert/45 hover:bg-alert/20 hover:border-alert",
  ghost:"bg-transparent text-muted border-transparent hover:bg-overlay hover:text-fg",
};

const button_size = {
  xs: "h-6 px-2 gap-1 text-xs",
  sm: "h-8 px-3 gap-1.5 text-sm",
  md: "h-10 px-4 gap-2 text-base",
  lg: "h-12 px-6 gap-2 text-lg",
};
export default function Buttons({
  variant = "primary",
  size = "md",
  type = "button",
  text,
  style = "",
  load_state = false,
  loading = "",
  ...handler
}) {
  return (
    <button
      type={type}
      disabled={load_state}
      className={`
        ${button_type[variant]} ${button_size[size]} ${style}
        inline-flex items-center justify-center rounded border whitespace-nowrap cursor-pointer select-none transition-colors duration-200 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
        `}
      {...handler}
    >
      {load_state ? loading : text}
    </button>
  );
}
