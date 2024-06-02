import noProfilePic from '../../../assets/images/no-profile-picture.png';
import TasksIcon from '../../../assets/icons/calendar-days.svg?react';

export const Sidebar = () => {
  return (
    <div className="relative flex w-[300px] flex-shrink-0 flex-col rounded-[6px] bg-gray-light p-[20px]">
      <nav className="flex-grow">
        <div>
          <div className="flex gap-[10px] pb-[10px] pt-[10px] text-[17px] font-medium">
            <div className="w-[24px]">
              <TasksIcon />
            </div>
            <div className="flex-grow">Tasks</div>
          </div>

          <ul>
            <li className="pl-[34px]">
              <button className="inline-flex w-full items-center justify-between rounded-[8px] p-[8px_10px] text-[14px] font-medium text-gray-dark">
                <span>All</span>
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] bg-gray px-[5px] text-[12px]"></span>
              </button>
            </li>
            <li className="pl-[34px]">
              <button className="inline-flex w-full items-center justify-between rounded-[8px] p-[8px_10px] text-[14px] font-medium text-gray-dark">
                <span>Active</span>
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] bg-gray px-[5px] text-[12px]"></span>
              </button>
            </li>
            <li className="pl-[34px]">
              <button className="inline-flex w-full items-center justify-between rounded-[8px] p-[8px_10px] text-[14px] font-medium text-gray-dark">
                <span>Completed</span>
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] bg-gray px-[5px] text-[12px]"></span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-x-[10px]">
          <div className="h-[35px] w-[35px]">
            <img src={noProfilePic} alt="Avatar" />
          </div>
          <div className="flex-grow text-[15px]">Mohamed Ismail</div>
        </div>
      </div>
    </div>
  );
};
