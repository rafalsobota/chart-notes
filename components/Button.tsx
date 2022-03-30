export type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium bg-white rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 text-slate-900 ${
        disabled
          ? "cursor-wait bg-slate-300 hover:bg-slate-300 focus:text-slate-900"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
