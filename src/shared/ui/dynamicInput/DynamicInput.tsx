import { IconsLibrary } from 'shared/IconsLibrary';
import { Button, Input } from '..';

interface InputType {
  touched: boolean;
  error: string | undefined;
  field: object;
  remove: (index: number) => void;
  array: string[];
  push: (value: string) => void;
  index: number;
}

export const DynamicInputForm = ({
  touched,
  error,
  field,
  remove,
  array,
  push,
  index,
}: InputType) => {
  return (
    <>
      <div className="relative w-full">
        <Input
          error={touched && error ? error : ''}
          state={touched && error ? 'failure' : undefined}
          {...field}
        />
        {index !== 0 && (
          <Button
            type="button"
            variant="outline"
            mode="dark"
            onClick={() => remove(index)}
            className="absolute top-2 right-3 text-gray-500 px-1 py-1 rounded border-none shadow-none"
          >
            <IconsLibrary.Delete />
          </Button>
        )}
      </div>
      {index === array.length - 1 && (
        <Button
          type="button"
          variant="outline"
          mode="dark"
          onClick={() => push('')}
          className="text-primary-700 text-xs font-normal rounded flex justify-center items-center border-none shadow-none 
          hover:bg-transparent hover:text-primary-500 hover:ring-0 hover:outline-none hover:shadow-none mt-1 ml-auto"
        >
          <IconsLibrary.Plus />
          <span>Add qualification</span>
        </Button>
      )}
    </>
  );
};
