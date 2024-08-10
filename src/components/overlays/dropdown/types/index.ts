export type DropdownProps = {
  className?: string;
  enableActiveState?: boolean;
  initialActive?: string;
  children: React.ReactNode;
};

export type ToggleProps = {
  children: ({
    active,
    isOpen,
    toggle,
  }: {
    active: string;
    isOpen: boolean;
    toggle: () => void;
  }) => React.ReactNode;
};

export type ListPosition =
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'bottom-left'
  | 'top-full'
  | 'bottom-full';

export type ListProps = {
  className?: string;
  position?: ListPosition;
  width?: 'default' | 'full';
  children: React.ReactNode;
};

export type ItemProps = {
  id: string;
  children: React.ReactNode;
};
