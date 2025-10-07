
import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, type = 'text', placeholder, name, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1.5 text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || `Ingrese ${label.toLowerCase()}`}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />
    </div>
  );
};

interface TextAreaInputProps {
  label: string;
  placeholder?: string;
  name: string;
  rows?: number;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, placeholder, name, rows = 3, className = '' }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor={name} className="mb-1.5 text-sm font-medium text-gray-600">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder || `Ingrese ${label.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        </div>
    );
};
