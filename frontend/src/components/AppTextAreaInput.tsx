import { cn } from "~/lib/utils";

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  name: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: string;
}

const AppTextAreaInput = ({
  className,
  label,
  error,
  id,
  name,
  helperText,
  containerClassName,
  labelClassName,
  ...inputProps
}: Props) => {
  return (
    <div className={cn("my-3", containerClassName)}>
      <label
        htmlFor={id || name}
        className={cn(
          "block text-sm font-medium text-gray-700",
          labelClassName
        )}
      >
        {label} {inputProps.required && "*"}
      </label>

      <textarea
        id={id || name}
        name={name}
        className={cn(
          "mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm",
          className,
          {
            "border-red-200": error,
            "border-gray-200": !error,
          }
        )}
        {...inputProps}
        aria-describedby={`${name}_info`}
      />

      <span className="text-gray-500 text-xs mt-1">{helperText}</span>

      <span className="text-red-600 text-sm my-1" id={`${name}_info`}>
        {error}
      </span>
    </div>
  );
};

export default AppTextAreaInput;
