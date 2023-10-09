import { CustomFlowbiteTheme, Label, Textarea } from 'flowbite-react';
import React, { useId } from 'react';

interface TextAreaProps
  extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'> {
  label?: string;
  state?: 'failure' | 'success' | 'warning' | 'info';
  helperText?: React.ReactNode | string;
  error?: string;
}

const theme: CustomFlowbiteTheme['textarea'] = {
  colors: {
    gray: `focus:ring-gray-300/60 bg-gray-100 
    focus:border-gray-300/60 focus:ring-1 focus:ring-offset-1  
    hover:ring-gray-300/60 hover:ring-1 hover:ring-offset-1 hover:border-gray-300/60
    border-gray-300 text-gray-900 placeholder:text-gray-400`,
  },
  base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-sm',
};
export function TextArea({
  label,
  state,
  helperText,
  error,
  ...p
}: TextAreaProps) {
  const id = useId();
  return (
    <div className={'relative'}>
      <Label htmlFor={id} value={label} />
      <Textarea
        id={id}
        type="text"
        helperText={helperText}
        color={state}
        theme={theme}
        {...p}
      />
      {error && (
        <span className={'absolute left-1 top-[102%] text-sm text-red-500'}>
          {error}
        </span>
      )}
    </div>
  );
}
