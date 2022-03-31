export const classes = (
  ...classNames: (string | undefined | null | boolean)[]
) => {
  return classNames.filter(Boolean).join(" ");
};

export type ClassNameProps = {
  className?: string;
};

export const FormHeader: React.FC<ClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classes(
        "px-5 pt-5 font-semibold bg-white rounded-t-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FormContent: React.FC<ClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classes("p-5 space-y-5 bg-white", className)}>
      {children}
    </div>
  );
};

export const FormSection: React.FC<{}> = ({ children }) => {
  return <div className={classes("space-y-2")}>{children}</div>;
};

export const FormOptionsGroup: React.FC<ClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classes(
        "flex flex-col justify-start space-y-2 md:space-x-5 md:space-y-0 md:flex-row",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FormActions: React.FC<ClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classes(
        "flex flex-row justify-end p-5 space-x-2 bg-opacity-50 bg-gray-50 rounded-b-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FormCard: React.FC<ClassNameProps> = ({ children, className }) => {
  return (
    <div
      className={classes(
        "text-sm text-gray-600 bg-white rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
};
