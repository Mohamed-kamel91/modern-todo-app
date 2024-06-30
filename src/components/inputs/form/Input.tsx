import React from 'react';
import clsx from 'clsx';

// Utility function to generate styles for checkboxes
const getCheckboxStyles = (isChecked: boolean) => {
  return clsx(
    'relative h-[23px] w-[23px] flex-shrink-0 cursor-pointer appearance-none rounded-full border border-solid border-black-light leading-[0] transition-checkbox duration-100 ease-in',
    'before:border-success before:border-t-0 before:border-r-0 before:absolute before:left-1/2 before:top-1/2 before:h-[6px] before:w-[12px] before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-45 before:border-[2px] before:transition-checkbox before:duration-100 before:ease-in before:content-[""]',
    isChecked && 'border-[2px] border-success',
    isChecked ? 'before:opacity-100' : 'before:opacity-0'
  );
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      required,
      disabled,
      checked = false,
      autoComplete = 'off',
      isInvalid = false,
      ...props
    },
    ref
  ) => {
    const inputStyles =
      type === 'checkbox'
        ? getCheckboxStyles(checked)
        : 'w-full overflow-hidden rounded-[10px] p-[12px]';

    const combinedStyles = clsx(
      inputStyles,
      disabled && 'pointer-events-none cursor-not-allowed',
      className
    );

    return (
      <input
        className={combinedStyles}
        checked={checked}
        type={type}
        ref={ref}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={isInvalid}
        aria-required={required}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
