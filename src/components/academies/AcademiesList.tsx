import UserListItem from "./AcademiesListItem";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
  AcademyInterface,
} from "../../types/userTypes";

interface IUsersListProps {
  academies: Array<AcademyInterface>;
  lastItemRef: any;
  containerRef: any;
}

const AcademiesList: React.FC<IUsersListProps> = ({
  academies,
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
      {academies.map((academy, index) => {
        const isLast = index === academies.length - 1;
        return isLast ? (
          <UserListItem
            key={academy.Id}
            user={academy}
            innerRef={lastItemRef}
          />
        ) : (
          <UserListItem key={academy.Id} user={academy} />
        );
      })}
    </div>
  );
};

export default AcademiesList;
