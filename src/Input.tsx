import { ForwardedRef, forwardRef } from "react";

type InputProps = {
  label: string;
  name: string;
  defaultValue: number;
  step: number;
  max: number;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, name, defaultValue, step, max } = props;
    return (
      <div className="flex justify-between items-center w-56 lg:w-64">
        <label htmlFor={name}>{label}</label>
        <input
          className="px-2 w-20 lg:w-28 py-0.5 lg:py-1 text-center rounded-md bg-zinc-800 appearance-none outline-none"
          name={name}
          id={name}
          type="number"
          defaultValue={defaultValue}
          step={step}
          max={max}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
