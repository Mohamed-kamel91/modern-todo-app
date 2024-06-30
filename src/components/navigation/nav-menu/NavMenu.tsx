import { cn } from '@utils';
import {
  NavMenuProvider,
  useNavMenuContext,
} from './navmenu-context';
import React, { Children, cloneElement } from 'react';

type NavMenuProps = {
  className?: string;
  children: React.ReactNode;
};

export const NavMenu = ({ className, children }: NavMenuProps) => {
  return (
    <NavMenuProvider>
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
  const { activeItem, setActiveItem } = useNavMenuContext();

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
              isActive: activeItem === index,
              handleActiveItem: () => setActiveItem(index),
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
  handleActiveItem?: () => void;
};

export const NavMenuItem = ({
  className,
  isActive,
  children,
  handleActiveItem,
}: NavMenuItemProps) => {
  return (
    <li
      className={cn(
        'relative font-semibold',
        isActive && 'rounded-[8px] bg-gray !font-bold',
        className
      )}
      aria-selected={isActive}
      onClick={handleActiveItem}
    >
      {children}
    </li>
  );
};
