import {
  IUserManagement,
  UserLabels,
  UserInterface,
  PlayerProfileInterface,
  AcademyInterface,
} from "../../types/userTypes";

import UserStatusInfo from "./status/UserStatusInfo";
import TileViewLinkItem from "components/common/tileView/TileViewLinkItem";

interface IUserListItemProps {
  user: AcademyInterface;
  innerRef?: any;
}

const AcademiesListItem: React.FC<IUserListItemProps> = ({
  user,
  innerRef,
}) => {
  const typeSwitch = (type: number) => {
    switch (type) {
      case 0:
        return "akademia";

      case 1:
        return "klub";

      case 2:
        return "reprezentacja";

      default:
        return type;
    }
  };

  return (
    <div ref={innerRef}>
      <TileViewLinkItem
        title={`${user.Name} `}
        link={`/users/detail/${user.Id}`}
        img={user.FtpFilePath}
        content={
          <>
            <div className="tileInfo">
              <div>
                <span className="tileInfo__label">{"Nazwa akademii"}</span>
                <span>{user.Name}</span>
              </div>

              <div>
                <span className="tileInfo__label">Lokalizacja</span>
                <span>{user.City}</span>
              </div>

              <div>
                <span className="tileInfo__label">Typ profilu</span>
                <span>{typeSwitch(user.Type)}</span>
              </div>
            </div>
            <div className="justify-self-end ">
              <UserStatusInfo isActive={false} />
            </div>
          </>
        }
      />
    </div>
  );
};

export default AcademiesListItem;
