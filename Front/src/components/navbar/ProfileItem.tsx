import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { signOut } from "../../store/actions/auth";

import Placeholder from "../../assets/images/placeholder.svg";
import LogOutIco from "../../assets/icons/logout.svg";

const ProfileItem = () => {
  const { auth, currentUser } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <>
      {auth.isAuth && currentUser && (
        <div className="hidden md:flex items-center justify-between w-full px-18 my-4">
          <div className="flex gap-x-2">
            <div className="w-7 h-7 rounded-full border-2 border-blue  overflow-hidden ">
              <img src={Placeholder} alt="" />
            </div>
            <div className="flex flex-col justify-center text-xs leading-none">
              <div>{currentUser.userName}</div>
              <div className="text-gray-light">{currentUser.position}</div>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="opacity-70 hover:opacity-100"
            >
              <img src={LogOutIco} alt="" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileItem;
