import React from 'react';

interface SelectFieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    labelOptional?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, name, label, value, onChange, error, required = false, children, labelOptional }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-camber-text-secondary mb-1">
            {label} {required && <span className="text-red-500">*</span>} {labelOptional && <span className="text-gray-400">{labelOptional}</span>}
        </label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg text-base h-12 ${error ? 'border-red-500' : 'border-camber-background-muted'}`}
            required={required}
        >
            {children}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default SelectField;
