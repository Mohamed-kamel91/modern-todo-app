import { Head } from '@components/data-display';
import { ReactNode } from 'react';

type ContentLayoutProps = {
  title: string;
  children: ReactNode;
};

export const ContentLayout = ({
  title,
  children,
}: ContentLayoutProps) => {
  return (
    <>
      <Head
        title={title}
        description="Stay organized and boost productivity."
      />
      
      <div className="flex h-full max-w-[700px] flex-col">
        <h1>{title}</h1>

        <div className="mt-[30px] flex-grow">{children}</div>
      </div>
    </>
  );
};
