export const FormHeader: React.FC<{}> = ({ children }) => {
  return (
    <div className="px-5 pt-5 font-semibold bg-white rounded-t-md">
      {children}
    </div>
  );
};

export const FormContent: React.FC<{}> = ({ children }) => {
  return <div className="p-5 space-y-5 bg-white">{children}</div>;
};

export const FormSection: React.FC<{}> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

export const FormOptionsGroup: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex flex-col justify-start space-y-2 md:space-x-5 md:space-y-0 md:flex-row">
      {children}
    </div>
  );
};

export const FormActions: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex flex-row justify-end p-5 space-x-2 bg-opacity-50 bg-gray-50 rounded-b-md">
      {children}
    </div>
  );
};

export const FormCard: React.FC<{}> = ({ children }) => {
  return (
    <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-md">
      {children}
    </div>
  );
};
