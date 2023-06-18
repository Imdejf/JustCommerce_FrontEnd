import {
  IUserManagement,
  UserLabels,
  UserInterface,
  PlayerProfileInterface,
} from "../../types/userTypes";

import UserStatusInfo from "./status/UserStatusInfo";
import TileViewLinkItem from "components/common/tileView/TileViewLinkItem";

interface IUserListItemProps {
  user: PlayerProfileInterface;
  innerRef?: any;
}

const UserListItem: React.FC<IUserListItemProps> = ({ user, innerRef }) => {
  const typeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Zawodnik";

      case 2:
        return "Trener";
      default:
        return type;
    }
  };

  return (
    <div ref={innerRef}>
      <TileViewLinkItem
        title={`${user.Name} `}
        link={`/users/detail/${user.Id}`}
        img={user.FtpPhotoFilePath}
        content={
          <>
            <div className="tileInfo">
              <div>
                <span className="tileInfo__label">{UserLabels.fullName}</span>
                <span>{user.Name}</span>
              </div>

              <div>
                <span className="tileInfo__label">Typ profilu</span>
                <span>{typeSwitch(user.Type)}</span>
              </div>

              <div>
                <span className="tileInfo__label">Czy zawodnik zrzeszony</span>
                <span>{user.Associated ? "Tak" : "Nie"}</span>
              </div>
            </div>
            <div className="justify-self-end ">
              <UserStatusInfo isActive={user.IsActivated} />
            </div>
          </>
        }
      />
    </div>
  );
};

export default UserListItem;
