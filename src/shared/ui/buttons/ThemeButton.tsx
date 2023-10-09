import clsx from 'clsx';
import { twMerge } from 'tw-merge';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;

  size?: 'vs' | 'sm' | 'md' | 'lg';
  mode?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
}

export function Button({
  children,
  className,
  mode = 'primary',
  size = 'sm',
  variant = 'solid',
  ...props
}: ButtonProps) {
  const typeClasses = clsx(
    mode === 'primary' &&
      'bg-primary-50 text-primary-600 border-primary-100 shadow-primary-100/60 ' +
        'hover:bg-primary-400 hover:text-primary-50 hover:border-primary-100/60 hover:shadow-primary-100/80 ' +
        'hover:ring-primary-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'secondary' &&
      'bg-secondary-50 text-secondary-600 border-secondary-100 shadow-secondary-100/60 ' +
        'hover:bg-secondary-100 hover:text-secondary-50 hover:border-secondary-100/60 hover:shadow-secondary-100/80 ' +
        'hover:ring-secondary-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'success' &&
      'bg-green-50 text-green-600 border-green-100 shadow-green-100/60 ' +
        'hover:bg-green-400 hover:text-green-50 hover:border-green-100/60 hover:shadow-green-100/80 ' +
        'hover:ring-green-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'danger' &&
      'bg-red-50 text-red-600 border-red-100 shadow-red-100/60 ' +
        'hover:bg-red-400 hover:text-red-50 hover:border-red-100/60 hover:shadow-red-100/80 ' +
        'hover:ring-red-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'warning' &&
      'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/60 ' +
        'hover:bg-amber-400 hover:text-amber-50 hover:border-amber-100/60 hover:shadow-amber-100/80 ' +
        'hover:ring-amber-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'info' &&
      'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/60 ' +
        'hover:bg-blue-400 hover:text-blue-50 hover:border-blue-100/60 hover:shadow-blue-100/80 ' +
        'hover:ring-blue-100/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'light' &&
      'bg-gray-100 text-gray-800 border-gray-100 shadow-gray-200/60 ' +
        'hover:bg-gray-200 hover:text-gray-800 hover:border-gray-200/60 hover:shadow-gray-200/80 ' +
        'hover:ring-gray-200/60 hover:ring-2 hover:ring-offset-2 transition-all duration-200',

    mode === 'dark' &&
      'bg-gray-800 text-white border-gray-800 shadow-gray-800 ' +
        'hover:bg-gray-700 hover:text-white hover:border-gray-700 hover:shadow-gray-700 ' +
        'hover:ring-gray-700 hover:ring-2 hover:ring-offset-2 transition-all duration-200'
  );

  const sizeClasses = clsx(
    size === 'vs' && 'text-xs',
    size === 'sm' && 'text-sm',
    size === 'md' && 'text-sm',
    size === 'lg' && 'text-base'
  );

  const variantClasses = clsx(
    variant === 'outline' && 'bg-transparent',
    variant === 'ghost' && 'bg-transparent border-transparent shadow-none '
  );

  const btnClass = twMerge(
    'flex justify-center items-center shadow-md border rounded font-medium truncate cursor-pointer px-2 py-0.5 font-Inter' +
      sizeClasses +
      ' ' +
      typeClasses +
      ' ' +
      variantClasses +
      ' disabled:cursor-not-allowed disabled:bg-gray-400 ' +
      className
  );

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
