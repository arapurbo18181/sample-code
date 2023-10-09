import { useId } from 'react';

type RadioButtonProps = {
  name?: string;
  onChange: (value: boolean) => void;
  checked: boolean;
  label?: string;
  disabled?: boolean;
};
export const RadioButton = ({
  disabled,
  label,
  name,
  onChange,
  checked,
}: RadioButtonProps) => {
  const id = useId();

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className={`w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 cursor-pointer
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm text-gray-700 cursor-pointer capitalize font-Inter"
      >
        {label}
      </label>
    </div>
  );
};
