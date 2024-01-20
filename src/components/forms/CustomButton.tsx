import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  outerClassName?: string;
  disabled?: boolean;
};
const CustomButton = ({
  type,
  className,
  outerClassName = "mt-1",
  disabled,
  children,
}: ButtonProps) => {
  return (
    <div className={outerClassName}>
      <button
        disabled={disabled}
        type={type}
        className={`rounded-md bg-blue-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 w-full focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
