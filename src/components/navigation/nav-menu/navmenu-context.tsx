import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Context
export type NavMenuContextType = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const NavMenuContext = createContext<NavMenuContextType | null>(
  null
);

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
  const [active, setActive] = useState<number>(-1);

  const value = useMemo(() => ({ active, setActive }), [active]);

  useEffect(() => {
    if (
      options?.initialActive !== null &&
      options?.initialActive !== undefined
    ) {
      setActive(options.initialActive);
    }
  }, [options?.initialActive]);

  return (
    <NavMenuContext.Provider value={value}>
      {children}
    </NavMenuContext.Provider>
  );
};
