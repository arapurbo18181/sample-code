import { CustomFlowbiteTheme, Label, TextInput } from "flowbite-react";
import React, { useId } from "react";
import { IconType } from "shared/IconsLibrary";

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, "ref"> {
  label?: string;
  state?: "failure" | "success" | "warning" | "info";
  helperText?: React.ReactNode | string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  sizing?: "sm" | "md" | "lg";
  error?: string;
}

const theme: CustomFlowbiteTheme["textInput"] = {
  field: {
    input: {
      colors: {
        gray: `focus:ring-gray-300/60 bg-gray-100 
        focus:border-gray-300/60 focus:ring-1 focus:ring-offset-1  
        hover:ring-gray-300/60 hover:ring-1 hover:ring-offset-1 hover:border-gray-300/60
        border-gray-300 text-gray-900 placeholder:text-gray-400`,
      },
      sizes: {
        sm: "px-1 py-1",
        md: "px-2 py-1.5",
        lg: "px-2 py-2",
      },
      withAddon: {
        off: "rounded-md",
      },
    },
  },
};

export function Input({
  label,
  state,
  helperText,
  rightIcon,
  leftIcon,
  sizing,
  error,
  ...p
}: InputProps) {
  const id = useId();

  return (
    <div className={"relative w-full"}>
      <Label color={state} htmlFor={id} value={label} />
      <TextInput
        id={id}
        sizing={sizing}
        type="text"
        helperText={helperText}
        icon={leftIcon}
        rightIcon={rightIcon}
        color={state}
        theme={theme}
        {...p}
      />
      {error && (
        <span className={"absolute left-1 top-[102%] text-sm text-red-500"}>
          {error}
        </span>
      )}
    </div>
  );
}
