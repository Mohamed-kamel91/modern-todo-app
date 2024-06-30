import { cn } from '@utils';
import { useEffect, useState } from 'react';

type TooltipProps = {
  className?: string;
  label: string | number;
  showOn?: 'hover' | 'click';
  showFor?: number;
  children:
    | React.ReactNode
    | (({
        show,
        showTooltip,
      }: {
        show: boolean;
        showTooltip: () => void;
      }) => React.ReactNode);
};

export const Tooltip = ({
  className = '',
  label,
  showOn = 'hover',
  showFor,
  children,
}: TooltipProps) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  const handelClick = () => {
    setShow(true);
  };

  const showTooltip = () => setShow(true);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | null = null;

    if (show && showFor) {
      id = setTimeout(() => setShow(false), showFor);
    }

    return () => {
      if (id) clearTimeout(id);
    };
  }, [show, showFor]);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={showOn === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={showOn === 'hover' ? handleMouseLeave : undefined}
      onClick={showOn === 'click' ? handelClick : undefined}
    >
      {typeof children === 'function'
        ? children({ show, showTooltip })
        : children}

      {show && (
        <div className="absolute bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 rounded-[4px] bg-black px-[5px] py-[2px] text-[12px] text-white">
          {label}
        </div>
      )}
    </div>
  );
};
