import React from 'react';

interface ErrorMessageProps {
  message: string;
  details?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details }) => {
  return (
    <div className="bg-red-900 border border-accent text-light px-4 py-3 rounded-lg relative text-center" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline ml-2">{message}</span>
      {details && <p className="text-sm mt-2">{details}</p>}
    </div>
  );
};

export default ErrorMessage;
