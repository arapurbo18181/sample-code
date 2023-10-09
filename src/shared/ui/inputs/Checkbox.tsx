import clsx from 'clsx';
import React, { useId } from 'react';
import { IconsLibrary } from 'shared/IconsLibrary';

export function Checkbox(props: React.HTMLProps<HTMLInputElement>) {
  const { ...rest } = props;
  const id = useId();

  const labelClass = clsx(
    'w-4 h-4 border border-primary-200 block text-primary-600 ' +
      'flex justify-center items-center rounded cursor-pointer '
  );

  const checkboxClass = clsx('transition-all duration-75 ease-in-out ', {
    'w-0 h-0': !props.checked,
    'w-full h-full': props.checked,
  });

  return (
    <>
      <label htmlFor={id} className={labelClass}>
        <IconsLibrary.CheckIcon className={checkboxClass} />
      </label>

      <input type={'checkbox'} className={'hidden'} hidden id={id} {...rest} />
    </>
  );
}
