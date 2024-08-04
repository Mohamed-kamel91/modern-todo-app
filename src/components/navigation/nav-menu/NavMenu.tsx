import React, { Children, cloneElement } from 'react';

import {
  NavMenuProvider,
  useNavMenuContext,
} from './navmenu-context';
import { cn } from '@utils';

type NavMenuProps = {
  className?: string;
  initialActive?: number;
  children: React.ReactNode;
};

export const NavMenu = ({
  className,
  initialActive,
  children,
}: NavMenuProps) => {
  return (
    <NavMenuProvider options={{ initialActive }}>
      <div className={cn(className)}>{children}</div>
    </NavMenuProvider>
  );
};

type NavMenuListProps = {
  className?: string;
  title?: string;
  icon?: JSX.Element;
  children: React.ReactNode;
};

export const NavMenuList = ({
  className,
  title,
  icon,
  children,
}: NavMenuListProps) => {
  const { active, setActive } = useNavMenuContext();

  return (
    <>
      {title && (
        <div className="flex gap-[10px] py-[10px] text-[16px] font-bold">
          {icon && icon}
          <div className="flex-grow">{title}</div>
        </div>
      )}

      <ul className={cn(className)}>
        {Children.map(children, (child, index) => {
          return cloneElement(
            child as React.ReactElement<NavMenuItemProps>,
            {
              isActive: active === index,
              handleActive: () => setActive(index),
            }
          );
        })}
      </ul>
    </>
  );
};

type NavMenuItemProps = {
  className?: string;
  isActive?: boolean;
  children: React.ReactNode;
  handleActive?: () => void;
};

export const NavMenuItem = ({
  className,
  isActive,
  children,
  handleActive,
}: NavMenuItemProps) => {
  return (
    <li
      className={cn(
        'relative font-semibold',
        isActive && 'rounded-[8px] bg-gray !font-bold',
        className
      )}
      aria-selected={isActive}
      onClick={handleActive}
    >
      {children}
    </li>
  );
};
