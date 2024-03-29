interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}
export function Toggle({ label, ...rest }: Props) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" {...rest} />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300
                rounded-full peer peer-checked:after:translate-x-full
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                after:transition-all peer-checked:bg-primary-600"
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
}
