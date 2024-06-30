import clsx from 'clsx';

type EmptyTasksProps = {
  className?: string;
  message: string;
};

export const EmptyTasks = ({
  className = '',
  message,
}: EmptyTasksProps) => {
  return (
    <p className={clsx('mb-[40px] mt-[20px]', className)}>
      {message}
    </p>
  );
};
