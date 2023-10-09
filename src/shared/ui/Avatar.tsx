import { twMerge } from 'tw-merge';

type Props = {
  className?: string;
  url: string;
};

export function Avatar(p: Props) {
  const { className, url } = p;

  return (
    <>
      <div
        className={twMerge(
          'min-w-[3rem] min-h-[3rem] p-1 border border-gray-300 rounded-full ' +
            className
        )}
      >
        <img
          className={'object-cover w-full h-full rounded-full'}
          src={url}
          alt={'avatar'}
        />
      </div>
    </>
  );
}
