import { IUserContact, UserLabels, UserInterface } from "../../types/userTypes";
import Placeholder from "../../assets/images/placeholder.svg";

interface IContactListItemProps {
  contact: UserInterface;
  innerRef?: any;
}

const ContactListItem: React.FC<IContactListItemProps> = ({
  contact,
  innerRef,
}) => {
  return (
    <div
      ref={innerRef}
      className="flex flex-col rounded bg-opacity-50 bg-white py-12 px-18 text-sm leading-relaxed"
    >
      <div className="text-base font-medium opacity-80 p-4">
        <span>
          {contact.FirstName} {contact.LastName}
        </span>
      </div>

      <div className="flex py-4 px-12">
        <div className="flex flex-col flex-grow ">
          <div className="tileInfo">
            <div>
              <span className="tileInfo__label">{UserLabels.fullName}</span>
              <span>
                {contact.FirstName} {contact.LastName}
              </span>
            </div>

            <div>
              <span className="tileInfo__label">{UserLabels.email}</span>
              <span> {contact.Email} </span>
            </div>

            <div>
              <span className="tileInfo__label">{UserLabels.phoneNumber}</span>
              <span> {contact.PhoneNumber} </span>
            </div>

            <div>
              <span className="tileInfo__label">{UserLabels.position}</span>
              <span> {contact.Position} </span>
            </div>
          </div>
        </div>

        <div
          className="w-28 h-28 self-end shadow-md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={Placeholder}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
