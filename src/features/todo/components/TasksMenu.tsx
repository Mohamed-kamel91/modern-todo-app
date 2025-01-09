import { Link, useSearchParams } from 'react-router-dom';

import { Badge } from '@components/data-display';
import { Button } from '@components/inputs/buttons';
import {
  NavMenu,
  NavMenuItem,
  NavMenuList,
} from '@components/navigation/nav-menu';

import { useTasksStore } from '@features/tasks';
import { TasksStore } from '@features/tasks/store/tasks-store';

import { cn } from '@utils';

import TasksIcon from '../../../assets/icons/calendar-days.svg?react';
import AllIcon from '../../../assets/icons/list-bullet.svg?react';
import ActiveIcon from '../../../assets/icons/plus-circle.svg?react';
import CompletedIcon from '../../../assets/icons/check-circle.svg?react';

type TaskMenuItem = {
  label: string;
  to: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  badgeCount: keyof Pick<
    TasksStore,
    'allTasksCount' | 'activeTasksCount' | 'completedTasksCount'
  >;
};

const taskMenuItems: TaskMenuItem[] = [
  {
    label: 'All',
    to: 'tasks',
    icon: AllIcon,
    // icon: <AllIcon className="icon-sm stroke-2" />,
    badgeCount: 'allTasksCount',
  },
  {
    label: 'Active',
    to: '?status=active',
    icon: ActiveIcon,
    // icon: <ActiveIcon className="icon-sm stroke-2" />,
    badgeCount: 'activeTasksCount',
  },
  {
    label: 'Completed',
    to: '?status=completed',
    icon: CompletedIcon,
    // icon: <CompletedIcon className="icon-sm stroke-2" />,
    badgeCount: 'completedTasksCount',
  },
];

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
  const tasksStore = useTasksStore((state) => state);
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status');
  const initialActive = status
    ? STATUS_MAP[status]
    : STATUS_MAP.all;

  return (
    <NavMenu initialActive={initialActive}>
      <NavMenuList
        title="Tasks"
        icon={<TasksIcon className="icon-md" />}
      >
        {taskMenuItems.map(
          ({ label, to, icon: Icon, badgeCount }) => (
            <NavMenuItem key={label} className="ml-[34px]">
              <Button
                as={Link}
                to={to}
                style={{ fontWeight: 'inherit' }}
                className="w-full"
                variant="default"
                size="sm"
                align="left"
                icon={
                  <Icon
                    className={cn(
                      'icon-sm stroke-2',
                      status === label.toLowerCase()
                        ? 'stroke-[2.5]'
                        : 'stroke-2'
                    )}
                  />
                }
              >
                {label}
              </Button>
              <Badge
                style={{ fontWeight: 'inherit' }}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px]"
                size="sm"
                variant="default"
              >
                {tasksStore[badgeCount]}
              </Badge>
            </NavMenuItem>
          )
        )}
      </NavMenuList>
    </NavMenu>
  );
};
