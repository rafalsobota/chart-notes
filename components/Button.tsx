export type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  className,
  variant,
}) => {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium bg-white rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-blue-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-500 text-slate-900
      ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:text-white"
          : ""
      }
      ${
        disabled
          ? "cursor-wait bg-slate-300 hover:bg-slate-300 focus:text-slate-900"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
