import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseFormRegister } from "react-hook-form";

type CustomInputProps = {
  label: string;
  type: string;
  rest?: any;
  name: string;
  register: UseFormRegister<any>;
  errors?: string;
  required?: boolean;
  placeholder?: string;
  outerClassName?: string;
};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
export default function CustomInput({
  label,
  type = "text",
  name,
  register,
  required = false,
  errors,
  placeholder = "Enter value",
  outerClassName = "",
  ...rest
}: CustomInputProps) {
  return (
    <div className={outerClassName}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        {name === "price" && (
          <span
            className={`absolute inset-y-0 left-0 flex text-sm items-center pl-2 pr-5  ${
              errors
                ? " ring-red-500 focus:ring-red-500 placeholder:text-red-500 text-red-500"
                : " "
            }`}
          >
            $
          </span>
        )}
        <input
          type={type}
          id={name}
          {...register(name, { required })}
          className={classNames(
            `block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm px-2  placeholder:text-gray-400 focus:ring-2 ring-1 ring-inset sm:text-sm sm:leading-6 outline-0 duration-100 focus:ring-black ring-gray-300 placeholder:text-sm placeholder:sm:text-base ${
              errors
                ? " ring-red-500 focus:ring-red-500 placeholder:text-red-500 text-red-500"
                : " "
            } ${name === "price" && "pl-[18px]"}`
          )}
          placeholder={placeholder}
        />
        {errors && errors.length > 0 && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors && errors.length > 0 && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {errors}
        </p>
      )}
    </div>
  );
}
