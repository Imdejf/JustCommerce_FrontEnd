import UserListItem from "./UserListItem";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
} from "../../types/userTypes";

interface IUsersListProps {
  playerProfiles: Array<PlayerProfileInterface>;
  lastItemRef: any;
  containerRef: any;
}

const UsersList: React.FC<IUsersListProps> = ({
  playerProfiles,
  lastItemRef,
  containerRef,
}) => {
  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px",
      }}
      className="flex flex-col md:grid gap-8 px-8 md:px-36 md:py-24"
      ref={containerRef}
    >
      {playerProfiles.map((profile, index) => {
        const isLast = index === playerProfiles.length - 1;
        return isLast ? (
          <UserListItem
            key={profile.Id}
            user={profile}
            innerRef={lastItemRef}
          />
        ) : (
          <UserListItem key={profile.Id} user={profile} />
        );
      })}
    </div>
  );
};

export default UsersList;
