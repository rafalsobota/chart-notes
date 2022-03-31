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
      className={`py-2 px-4 text-sm font-medium bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-500 focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-500 
      ${
        variant === "primary"
          ? "bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:text-white"
          : "text-gray-600"
      }
      ${
        disabled
          ? "cursor-wait bg-gray-300 hover:bg-gray-300 focus:text-gray-900"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
