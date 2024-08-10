import React from 'react';

import { Label } from './Label';
import { Error } from './Error';

import { cn } from '@utils';

type FormGroupProps = {
  className?: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
};

export const FormGroup = ({
  className,
  label = '',
  error,
  children,
}: FormGroupProps) => {
  return (
    <div className={cn(className)}>
      <Label>
        {label}

        <div className="mt-[5px]">{children}</div>
      </Label>

      <Error className="mt-[5px]" errorMessage={error} />
    </div>
  );
};
