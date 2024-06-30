import noProfilePic from '../../../assets/images/no-profile-picture.png';

export const Profile = () => {
  return (
    <div className="flex items-center gap-x-[10px]">
      <div className="h-[35px] w-[35px]">
        <img src={noProfilePic} alt="Avatar" />
      </div>
      <div className="flex-grow text-[15px]">Mohamed Ismail</div>
    </div>
  );
};
