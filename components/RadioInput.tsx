
import React, { useState, useEffect } from 'react';

interface RadioInputProps {
  label: string;
  name: string;
  showDescribe?: boolean;
  defaultValue?: { value: string; description?: string };
  readOnly?: boolean;
}

export const RadioInput: React.FC<RadioInputProps> = ({ label, name, showDescribe = true, defaultValue, readOnly = false }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue?.value || null);

  useEffect(() => {
    setSelectedValue(defaultValue?.value || null);
  }, [defaultValue]);

  return (
    <div className="flex flex-col md:col-span-1">
      <span className="mb-1.5 text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center space-x-4">
        <label className="flex items-center cursor-pointer">
          <input type="radio" name={name} value="si" className="form-radio h-4 w-4 text-blue-600"
            checked={selectedValue === 'si'}
            onChange={(e) => !readOnly && setSelectedValue(e.target.value)} 
            disabled={readOnly}
          />
          <span className="ml-2 text-sm">Sí</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input type="radio" name={name} value="no" className="form-radio h-4 w-4 text-blue-600"
            checked={selectedValue === 'no'}
            onChange={(e) => !readOnly && setSelectedValue(e.target.value)}
            disabled={readOnly}
          />
          <span className="ml-2 text-sm">No</span>
        </label>
      </div>
      {showDescribe && selectedValue === 'si' && (
        <input
          type="text"
          placeholder="Describir..."
          defaultValue={defaultValue?.description}
          readOnly={readOnly}
          className={`mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      )}
    </div>
  );
};
