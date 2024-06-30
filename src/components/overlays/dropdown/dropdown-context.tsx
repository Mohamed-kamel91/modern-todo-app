import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useDisclosure } from '@hooks';

export type DropDownContextType = {
  isOpen: boolean;
  active: string;
  listRef: React.MutableRefObject<HTMLDivElement | HTMLUListElement>;
  handleActive(id: string): (() => void) | undefined;
  toggle(): void;
  close(): void;
};

// Create dropdown context
const DropDownContext = createContext<DropDownContextType | null>(
  null
);

// Reusable dropdown context hook
export const useDropdownContext = () => {
  return useContext(DropDownContext);
};

type DropdownProviderProps = {
  enableActiveState: boolean;
  initialActive: string;
  children: React.ReactNode;
};

export const DropdownProvider = ({
  enableActiveState,
  initialActive,
  children,
}: DropdownProviderProps) => {
  // Active state
  const [active, setActive] = useState<string>(initialActive);

  // Disclosure hook
  const { isOpen, toggle, close } = useDisclosure();

  // Handle Active
  const handleActive = (id: string) => {
    if (enableActiveState && active !== id) {
      return () => setActive(id);
    }
  };

  // Menu Ref
  const listRef = useRef<HTMLDivElement | HTMLUListElement>(null!);

  // Close dropdown when click outside
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return close();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
      }, 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);

      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [listRef, isOpen]);

  // Set active state on route change
  useEffect(() => {
    if (enableActiveState) {
      setActive(initialActive);
    }
  }, [initialActive]);

  const value = {
    isOpen,
    active,
    handleActive,
    toggle,
    close,
    listRef,
  };

  return (
    <DropDownContext.Provider value={value}>
      {children}
    </DropDownContext.Provider>
  );
};
