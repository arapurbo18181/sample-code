import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { IconsLibrary } from "shared/IconsLibrary";
import { twMerge } from "tailwind-merge";

interface LabelValuePair {
  label: string;
  value: string;
  disabled?: boolean;
}

interface IAutocompleteProps {
  options: LabelValuePair[];
  label?: string;
  onChange: (_val: string) => void;
  value: string;

  message?: string;
  error?: string;

  className?: string; // for input wrapper
  containerClassName?: string; // for container wrapper
  isNumber?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Select(props: IAutocompleteProps) {
  const {
    options,
    label,
    value,
    onChange,
    message,
    error,
    className,
    containerClassName,
    isNumber,
    disabled,
    icon,
  } = props;
  // State for selected option and search query
  const [selected, setSelected] = useState<LabelValuePair | null>(null);
  const [query, setQuery] = useState<string>("");

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!query) return options;
    if (isNumber)
      return options.filter((option) => option.value.includes(query));
    return options.filter((option) =>
      option.value.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, options, isNumber]);

  const containerClass =
    twMerge(`relative h-full w-full flex flex-col relative text-start 
    outline-none ${containerClassName} ${
      disabled ? "opacity-70 cursor-not-allowed" : ""
    }`);

  const inputClass =
    twMerge(`peer h-fit w-full placeholder-transparent outline-none border 
    border-gray-300 rounded hover:ring-gray-300/60 hover:ring-1 hover:ring-offset-1 
    hover:shadow focus:ring-1 text-gray-700 bg-gray-100 text-gray-500 text-sm font-normal
    focus:ring-offset-1 focus:ring-gray-300/60 focus:border-gray-300/60 transition-all 
    duration-200 pr-4 ${icon ? "pl-10" : "pl-4"} ${className} ${
      error ? " border-red-500" : ""
    } 
    ${disabled ? "cursor-not-allowed" : ""}`);

  const labelClass = twMerge(`mb-1 cursor-text text-gray-900 text-start 
    text-sm truncate pointer-events-none max-w-[calc(100%-3rem)]
      transition-all duration-200 font-medium
    ${error ? "text-red-500" : ""} ${disabled ? "cursor-not-allowed" : ""}`);

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelected(selectedOption);
    } else {
      const enabledOpt = options.find((option) => !option.disabled);
      if (enabledOpt) {
        setSelected(enabledOpt);
        onOptionSelect(enabledOpt);
      } else {
        setSelected(options[0]);
        onOptionSelect(options[0]);
      }
    }
  }, [value, options]);

  const onOptionSelect = (option: LabelValuePair) => {
    onChange(option.value);
  };

  if (!selected) return null;

  return (
    <>
      <Combobox
        as={"div"}
        value={selected}
        onChange={onOptionSelect}
        disabled={disabled}
        className={containerClass}
      >
        {/* Label */}
        <Combobox.Label
          className={`${labelClass} ${error ? "text-error-400/75" : ""}`}
        >
          {label}
        </Combobox.Label>

        {/* Input */}
        <Combobox.Input
          onChange={(e) => setQuery(e.currentTarget.value)}
          displayValue={(selected: LabelValuePair) => selected.label}
          className={inputClass}
        />
        <div
          className={`absolute left-3 top-4 ${
            error ? "text-red-500" : "text-gray-500"
          }`}
        >
          {icon}
        </div>

        {/* Dropdown Button */}
        <Combobox.Button
          className={
            "absolute bottom-[0.5rem] w-5 h-5 flex items-center justify-center " +
            "right-3 " +
            (disabled ? "cursor-not-allowed" : "")
          }
        >
          <IconsLibrary.SingleDown className={"w-6 h-6"} />
        </Combobox.Button>

        {/* Error/Message */}
        {error && (
          <span className={"absolute left-1 top-[105%] text-red-500 text-sm"}>
            {error}
          </span>
        )}
        {!error && message && (
          <span className={"absolute left-1 top-[105%] text-gray-500 text-xs"}>
            {message}
          </span>
        )}

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          {/* Options TMList */}
          <Combobox.Options
            className={
              "absolute top-full w-full max-h-60 overflow-auto scrollbar-hide " +
              "bg-white shadow-lg rounded-md py-2 mt-1 opacity-100 z-50"
            }
          >
            {/* If no Option */}
            {!filteredOptions.length && query && (
              <div className={"px-4 py-2 text-sm text-gray-500"}>
                No results found
              </div>
            )}

            {/* Options */}
            {filteredOptions.map((option, i) => (
              <Combobox.Option
                key={option.value + `${i}`}
                value={option}
                disabled={option.disabled}
                className={({ active, disabled }) =>
                  "px-4 py-2 font-normal text-sm text-gray-600 " +
                  (active ? "bg-primary-100" : "") +
                  (disabled ? "opacity-50 cursor-not-allowed" : "")
                }
              >
                {option.label}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </>
  );
}
