import React, { createContext, useContext, useState } from 'react';

// Checkout form Context
export type NavMenuContextType = {
  activeItem: number;
  setActiveItem: React.Dispatch<React.SetStateAction<number>>;
};

const NavMenuContext = createContext<NavMenuContextType | null>(null);

// Context consumer
export const useNavMenuContext = () => {
  const context = useContext(NavMenuContext);

  if (!context) {
    throw new Error(
      'Component must be used within a NavMenuProvider'
    );
  }

  return context;
};

// Context provider
type NavMenuProviderProps = {
  children: React.ReactNode;
};

export const NavMenuProvider = ({
  children,
}: NavMenuProviderProps) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  return (
    <NavMenuContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </NavMenuContext.Provider>
  );
};
