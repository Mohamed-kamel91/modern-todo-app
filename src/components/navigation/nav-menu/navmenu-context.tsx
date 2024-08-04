import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

// Checkout form Context
export type NavMenuContextType = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
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
  options?: {
    initialActive?: number;
  };
  children: React.ReactNode;
};

export const NavMenuProvider = ({
  options = {},
  children,
}: NavMenuProviderProps) => {
  const [active, setActive] = useState<number>(
    () => options?.initialActive ?? 0
  );

  const value = useMemo(() => ({ active, setActive }), [active]);

  return (
    <NavMenuContext.Provider value={value}>
      {children}
    </NavMenuContext.Provider>
  );
};
