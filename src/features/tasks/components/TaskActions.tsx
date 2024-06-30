import { Dropdown } from '@components/overlays/dropdown';
import { Button, IconButton } from '@components/inputs/buttons';

import EllipsisIcon from '../../../assets/icons/ellipsis.svg?react';
import EditIcon from '../../../assets/icons/pencil.svg?react';
import TrashIcon from '../../../assets/icons/trash.svg?react';
import CompletedIcon from '../../../assets/icons/check-circle.svg?react';
import ActiveIcon from '../../../assets/icons/plus-circle.svg?react';

type TaskActionsProps = {
  taskId: string;
  isTaskCompleted: boolean;
  handleEditTask: () => void;
  handleMarkAsActive: () => void;
  handleMarkAsCompleted: () => void;
  handleDeleteTask: () => void;
};

export const TaskActions = ({
  taskId,
  isTaskCompleted,
  handleEditTask,
  handleMarkAsActive,
  handleMarkAsCompleted,
  handleDeleteTask,
}: TaskActionsProps) => (
  <Dropdown>
    <Dropdown.Toggle>
      {({ isOpen, toggle }) => (
        <IconButton
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={`task-dropdown-menu-${taskId}`}
          aria-label="Open task dropdown menu"
          onClick={toggle}
        >
          <EllipsisIcon className="icon-rg stroke-2" />
        </IconButton>
      )}
    </Dropdown.Toggle>

    <Dropdown.List>
      <Dropdown.Item id="edit-task">
        <Button
          className="w-full hover:bg-gray-light"
          variant="default"
          size="sm"
          align="left"
          icon={<EditIcon className="icon-sm" />}
          onClick={handleEditTask}
        >
          Edit task
        </Button>
      </Dropdown.Item>
      <Dropdown.Item
        id={isTaskCompleted ? 'mark-active' : 'mark-completed'}
      >
        {isTaskCompleted ? (
          <Button
            className="w-full hover:bg-gray-light"
            variant="default"
            size="sm"
            align="left"
            icon={<ActiveIcon className="icon-sm" />}
            onClick={handleMarkAsActive}
          >
            Mark as active
          </Button>
        ) : (
          <Button
            className="w-full hover:bg-gray-light"
            variant="default"
            size="sm"
            align="left"
            icon={<CompletedIcon className="icon-sm" />}
            onClick={handleMarkAsCompleted}
          >
            Mark as completed
          </Button>
        )}
      </Dropdown.Item>
      <Dropdown.Item id="delete-task">
        <Button
          className="w-full hover:bg-gray-light"
          variant="danger"
          size="sm"
          align="left"
          icon={<TrashIcon className="icon-sm" />}
          onClick={handleDeleteTask}
        >
          Delete task
        </Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
);
