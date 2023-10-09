import { CustomFlowbiteTheme, FileInput, Label } from 'flowbite-react';
import React, { useId } from 'react';

interface FileUploadProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const theme: CustomFlowbiteTheme['fileInput'] = {
  field: {
    input: {
      base: 'rounded-sm overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50',
      colors: {
        gray:
          'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 ' +
          'dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ' +
          'dark:focus:border-primary-500 dark:focus:ring-primary-500',
      },
    },
  },
};
export function FileUpload({
  label,
  helperText,
  error,
  ...p
}: FileUploadProps) {
  const id = useId();
  return (
    <div className="relative">
      <Label htmlFor={id} value={label} />
      <FileInput helperText={helperText} id={id} theme={theme} {...p} />

      {error && (
        <span className={'absolute left-1 top-[102%] text-sm text-red-500'}>
          {error}
        </span>
      )}
    </div>
  );
}
