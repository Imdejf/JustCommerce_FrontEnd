import ContactListItem from "./ContactListItem";

import { IUser, UserInterface } from "../../types/userTypes";

interface IProps {
  contacts: Array<UserInterface>;
  lastItemRef: any;
  containerRef: any;
}

const ContactsList: React.FC<IProps> = ({
  containerRef,
  lastItemRef,
  contacts,
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
      {contacts.map((contact, index) => {
        const isLast = index === contacts.length - 1;
        return isLast ? (
          <ContactListItem
            key={index}
            contact={contact}
            innerRef={lastItemRef}
          />
        ) : (
          <ContactListItem key={index} contact={contact} />
        );
      })}
    </div>
  );
};

export default ContactsList;
