import {
  IUserManagement,
  UserLabels,
  UserInterface,
} from "../../../types/userTypes";

import TileViewLinkItem from "components/common/tileView/TileViewLinkItem";

interface IUserListItemProps {
  user: UserInterface;
  innerRef?: any;
}

const RecommendationsListItem: React.FC<IUserListItemProps> = ({
  user,
  innerRef,
}) => {
  return (
    <div ref={innerRef}>
      <TileViewLinkItem
        title={`${user.FirstName} ${user.LastName}`}
        link={`/users/detail/${user.UserId}`}
        img=""
        content={
          <>
            <div className="tileInfo">
              <div>
                <span className="tileInfo__label">{UserLabels.fullName}</span>
                <span>
                  {user.FirstName} {user.LastName}
                </span>
              </div>

              <div>
                <span className="tileInfo__label">{UserLabels.email}</span>
                <span> {user.Email} </span>
              </div>

              <div>
                <span className="tileInfo__label">
                  {UserLabels.phoneNumber}
                </span>
                <span> {user.PhoneNumber} </span>
              </div>

              <div>
                <span className="tileInfo__label">{UserLabels.position}</span>
                <span> {user.Position} </span>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default RecommendationsListItem;
