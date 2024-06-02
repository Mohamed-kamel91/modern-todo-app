import { ReactNode } from 'react';

type ContentLayoutProps = {
  title: string;
  children: ReactNode;
};

export const ContentLayout = ({
  children,
  title,
}: ContentLayoutProps) => {
  return (
    <div className="flex h-full max-w-[800px] flex-col">
      <h1 className="text-[40px] font-extrabold">{title}</h1>

      <div className="mt-[30px] flex-grow">{children}</div>
    </div>
  );
};
