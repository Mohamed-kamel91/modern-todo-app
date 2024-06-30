import { ContentLayout } from '@components/layouts';
import { TasksSection, AddTask } from './components';

export const Tasks = () => {
  return (
    <ContentLayout title="Your tasks">
      <div className="justify-betw een flex h-full flex-col">
        <div className="h-full flex-grow">
          <TasksSection />
        </div>

        <div className="sticky bottom-0 z-[100] bg-white pb-[20px] pt-[20px]">
          <AddTask />
        </div>
      </div>
    </ContentLayout>
  );
};
