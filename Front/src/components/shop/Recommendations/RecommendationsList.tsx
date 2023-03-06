import RecommendationsListItem from "./RecommendationsListItem";
import { IUserManagement, UserInterface } from "../../../types/userTypes";

interface IUsersListProps {
  users: Array<UserInterface>;
  lastItemRef: any;
  containerRef: any;
}

const RecommendationsList: React.FC<IUsersListProps> = ({
  users,
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
      {users.map((user, index) => {
        const isLast = index === users.length - 1;
        return isLast ? (
          <RecommendationsListItem
            key={user.UserId}
            user={user}
            innerRef={lastItemRef}
          />
        ) : (
          <RecommendationsListItem key={user.UserId} user={user} />
        );
      })}
    </div>
  );
};

export default RecommendationsList;
