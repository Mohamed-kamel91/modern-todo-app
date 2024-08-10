import React from 'react';

import {
  DropdownProvider,
  DropDownContextType,
  useDropdown,
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
    useDropdown() as DropDownContextType;

  return <>{children({ active, isOpen, toggle })}</>;
};

/* DROPDOWN LIST */
const listPositionStyles = {
  'top-right': 'bottom-[calc(100%+5px)] left-[calc(100%-34px)]',
  'bottom-right': 'top-[calc(100%+5px)] left-[calc(100%-34px)]',
  'top-left': 'bottom-[calc(100%+5px)] right-[calc(100%-34px)]',
  'bottom-left': 'top-[calc(100%+5px)] right-[calc(100%-34px)]',
  'top-full': 'bottom-[calc(100%+5px)] right-0 left-0',
  'bottom-full': 'top-[calc(100%+5px)] right-0 left-0',
};

Dropdown.List = ({
  className = '',
  position = 'top-right',
  width = 'default',
  children,
}: ListProps) => {
  const { isOpen, close, listRef } =
    useDropdown() as DropDownContextType;

  const baseStyles =
    'max-h-[250px] rounded-[10px] bg-white py-[10px] shadow-dropdown';
  const positionOffsets = `absolute z-50 ${listPositionStyles[position]} `;
  const listWidth =
    width === 'full' ? 'w-full' : 'min-w-[190px]';

  return isOpen ? (
    <div
      className={cn(
        baseStyles,
        positionOffsets,
        listWidth,
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
    useDropdown() as DropDownContextType;

  return (
    <li
      id={id}
      className={cn(
        'mx-[6px]',
        active === id ? 'is-active' : ''
      )}
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
