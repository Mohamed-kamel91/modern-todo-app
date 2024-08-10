import { IconButton } from '../buttons';
import { Input, InputProps } from './Input';

import { useDisclosure } from '@hooks';

import ShowPassworIcon from '../../../assets/icons/eye.svg?react';
import HidePasswordIcon from '../../../assets/icons/eye-slash.svg?react';

export const PasswordInput = ({
  name,
  value,
  onChange,
}: InputProps) => {
  const { isOpen, toggle } = useDisclosure();

  // To maintain input focus when the show password button is clicked
  const handleKeepFocus = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <Input
        type={isOpen ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
      />

      <IconButton
        className="absolute right-0 top-1/2 mr-[6px] -translate-y-1/2"
        size="sm"
        type="button"
        onClick={toggle}
        onMouseDown={handleKeepFocus}
        aria-label={isOpen ? 'Hide password' : 'Show password'}
      >
        {isOpen ? (
          <HidePasswordIcon className="icon-md" />
        ) : (
          <ShowPassworIcon className="icon-md" />
        )}
      </IconButton>
    </div>
  );
};
