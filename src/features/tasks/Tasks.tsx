import { ContentLayout } from '@components/layouts';
import { TasksSection, AddTask } from './components';
import { useAuth } from '@features/auth/contexts/auth-context';

export const Tasks = () => {
  const { user } = useAuth();

  const userId = user?.id as string;

  return (
    <ContentLayout title="Tasks">
      <div className="justify-betw een flex h-full flex-col">
        <div className="h-full flex-grow">
          <TasksSection userId={userId} />
        </div>

        <div className="sticky bottom-0 z-[100] bg-white pb-[20px] pt-[20px]">
          <AddTask userId={userId} />
        </div>
      </div>
    </ContentLayout>
  );
};
