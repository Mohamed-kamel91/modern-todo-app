import { Badge } from '@components/data-display';
import { Button } from '@components/inputs/buttons';
import {
  NavMenu,
  NavMenuItem,
  NavMenuList,
} from '@components/navigation/nav-menu';

import { useTasksStore } from '@features/tasks';

import TasksIcon from '../../../assets/icons/calendar-days.svg?react';
import AllIcon from '../../../assets/icons/list-bullet.svg?react';
import ActiveIcon from '../../../assets/icons/plus-circle.svg?react';
import CompletedIcon from '../../../assets/icons/check-circle.svg?react';

export const TasksMenu = () => {
  const {
    setTasksType,
    activeTasksCount,
    completedTasksCount,
    allTasksCount,
  } = useTasksStore();

  return (
    <NavMenu>
      <NavMenuList
        title="Tasks"
        icon={<TasksIcon className="icon-md" />}
      >
        {/* All tasks */}
        <NavMenuItem className="ml-[34px]">
          <Button
            style={{ fontWeight: 'inherit' }}
            className="font-inherit w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<AllIcon className="icon-sm stroke-2" />}
            onClick={() => setTasksType('all')}
          >
            All
          </Button>
          <Badge
            style={{ fontWeight: 'inherit' }}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
            size="sm"
            variant="default"
          >
            {allTasksCount}
          </Badge>
        </NavMenuItem>

        {/* Active tasks */}
        <NavMenuItem className="ml-[34px]">
          <Button
            style={{ fontWeight: 'inherit' }}
            className="w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<ActiveIcon className="icon-sm stroke-2" />}
            onClick={() => setTasksType('active')}
          >
            Active
          </Button>
          <Badge
            style={{ fontWeight: 'inherit' }}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
            size="sm"
            variant="default"
            active={false}
          >
            {activeTasksCount}
          </Badge>
        </NavMenuItem>

        {/* Completed tasks */}
        <NavMenuItem className="ml-[34px]">
          <Button
            style={{ fontWeight: 'inherit' }}
            className="w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<CompletedIcon className="icon-sm stroke-2" />}
            onClick={() => setTasksType('completed')}
          >
            Completed
          </Button>
          <Badge
            style={{ fontWeight: 'inherit' }}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
            size="sm"
            variant="default"
            active={false}
          >
            {completedTasksCount}
          </Badge>
        </NavMenuItem>
      </NavMenuList>
    </NavMenu>
  );
};
