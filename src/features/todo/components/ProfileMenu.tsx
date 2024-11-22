import { Dropdown } from '@components/overlays';
import noProfilePic from '../../../assets/images/no-profile-picture.png';
import { Button } from '@components/inputs/buttons';
import LogoutIcon from '../../../assets/icons/logout.svg?react';
import { Logout } from '@features/auth/components/Logout';

export const ProfileMenu = () => {
  return (
    <Dropdown className='my-[10px]'>
      <Dropdown.Toggle>
        {({ isOpen, toggle }) => (
          <Button
            size="sm"
            className="w-full"
            variant="secondary"
            align="left"
            icon={
              <div className="h-[35px] w-[35px]">
                <img src={noProfilePic} alt="Avatar" />
              </div>
            }
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="profile-menu"
            aria-label="Open profile menu"
            onClick={toggle}
          >
            Mohamed Ismail
          </Button>
        )}
      </Dropdown.Toggle>

      <Dropdown.List position="top-full" width="full">
        <Dropdown.Item id="logout">
          <Logout>
            {({ handleLogout }) => (
              <Button
                className="w-full hover:bg-gray-light"
                variant="default"
                size="sm"
                align="left"
                icon={<LogoutIcon className="icon-md" />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Logout>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
};
