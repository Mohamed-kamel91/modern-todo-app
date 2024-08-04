import { Link, useSearchParams } from 'react-router-dom';

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

enum Status {
  ALL = 0,
  ACTIVE = 1,
  COMPLETED = 2,
}

const STATUS_MAP: Record<string, number> = {
  all: Status.ALL,
  active: Status.ACTIVE,
  completed: Status.COMPLETED,
};

export const TasksMenu = () => {
  const { activeTasksCount, completedTasksCount, allTasksCount } =
    useTasksStore((state) => state);

  const [searchParams] = useSearchParams();
  
  const filterStatus = searchParams.get('status');
  const initialActive = filterStatus
    ? STATUS_MAP[filterStatus]
    : undefined;

  return (
    <NavMenu initialActive={initialActive}>
      <NavMenuList
        title="Tasks"
        icon={<TasksIcon className="icon-md" />}
      >
        {/* All tasks */}
        <NavMenuItem className="ml-[34px]">
          <Button
            as={Link}
            to="tasks"
            style={{ fontWeight: 'inherit' }}
            className="font-inherit w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<AllIcon className="icon-sm stroke-2" />}
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
            as={Link}
            to="tasks?status=active"
            style={{ fontWeight: 'inherit' }}
            className="w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<ActiveIcon className="icon-sm stroke-2" />}
          >
            Active
          </Button>
          <Badge
            style={{ fontWeight: 'inherit' }}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
            size="sm"
            variant="default"
          >
            {activeTasksCount}
          </Badge>
        </NavMenuItem>

        {/* Completed tasks */}
        <NavMenuItem className="ml-[34px]">
          <Button
            as={Link}
            to="tasks?status=completed"
            style={{ fontWeight: 'inherit' }}
            className="w-full"
            variant="default"
            size="sm"
            align="left"
            icon={<CompletedIcon className="icon-sm stroke-2" />}
          >
            Completed
          </Button>
          <Badge
            style={{ fontWeight: 'inherit' }}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
            size="sm"
            variant="default"
          >
            {completedTasksCount}
          </Badge>
        </NavMenuItem>
      </NavMenuList>
    </NavMenu>
  );
};
