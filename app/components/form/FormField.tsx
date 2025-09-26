import React from 'react';

interface FormFieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    Icon?: React.ElementType;
    onIconClick?: () => void;
    isTextArea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ id, name, label, value, onChange, onKeyDown, error, type = 'text', required = false, placeholder, Icon, onIconClick, isTextArea = false }) => {
    const commonProps = {
        id,
        name,
        value,
        onChange,
        onKeyDown,
        required,
        placeholder,
        className: `w-full px-4 py-2 border rounded-lg text-base ${error ? 'border-red-500' : 'border-camber-background-muted'}`
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-camber-text-secondary mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {isTextArea ? (
                    <textarea {...commonProps} rows={4} />
                ) : (
                    <input {...commonProps} type={type} className={`${commonProps.className} h-12 ${Icon ? 'pr-10' : ''}`} />
                )}
                {Icon && !isTextArea && (
                    <button type="button" onClick={onIconClick} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                        <Icon />
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default FormField;