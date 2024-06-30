import React from 'react';
import clsx from 'clsx';

import {
  DropdownProvider,
  DropDownContextType,
  useDropdownContext,
} from './dropdown-context';

import { cn } from '@utils';
import {
  DropdownProps,
  ToggleProps,
  ListProps,
  ItemProps,
} from './types';

/* DROPDOWN CONTAINER */

export const Dropdown = ({
  className = '',
  enableActiveState = false,
  initialActive = '',
  children,
}: DropdownProps) => {
  return (
    <DropdownProvider
      enableActiveState={enableActiveState}
      initialActive={initialActive}
    >
      <div className={cn('relative', className)}>{children}</div>
    </DropdownProvider>
  );
};

/* DROPDOWN TOGGLE */

Dropdown.Toggle = ({ children }: ToggleProps) => {
  const { active, isOpen, toggle } =
    useDropdownContext() as DropDownContextType;

  return <>{children({ active, isOpen, toggle })}</>;
};

/* DROPDOWN LIST */

Dropdown.List = ({ className = '', children }: ListProps) => {
  const { isOpen, close, listRef } =
    useDropdownContext() as DropDownContextType;

  return isOpen ? (
    <div
      className={clsx(
        'absolute right-[calc(100%-34px)] top-[calc(100%+5px)] z-50 max-h-[250px] min-w-[190px] rounded-[10px] bg-white py-[10px] shadow-dropdown transition-all duration-100 ease-in',
        className
      )}
      ref={listRef as React.MutableRefObject<HTMLDivElement>}
    >
      <ul onClick={close}>{children}</ul>
    </div>
  ) : null;
};

/* DROPDOWN ITEM */

Dropdown.Item = ({ id, children }: ItemProps) => {
  const { active, handleActive } =
    useDropdownContext() as DropDownContextType;

  return (
    <li
      id={id}
      className={cn('mx-[6px]', active === id ? 'is-active' : '')}
      onClick={handleActive(id)}
    >
      {children}
    </li>
  );
};

/* DROPDOWN SEPERATOR */

Dropdown.Seperator = () => {
  return <li className="dropdown__seperator" />;
};
