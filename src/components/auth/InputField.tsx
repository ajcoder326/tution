import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const InputField = ({ 
  icon: Icon, 
  type, 
  placeholder, 
  name, 
  value,
  onChange,
  error,
  required 
}: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-brown-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full pl-10 pr-3 py-2 border ${
            error ? 'border-red-500' : 'border-brown-300'
          } rounded-md leading-5 bg-white placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;