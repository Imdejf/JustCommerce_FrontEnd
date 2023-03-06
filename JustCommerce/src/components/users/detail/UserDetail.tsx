import React, { useEffect, useState } from "react";
import usersService from "../../../services/usersService";

import { IUserManagement, UserInterface } from "../../../types/userTypes";
import InfoBox from "../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../layout/ContentContainer";
import DropdownPanel from "../../common/panels/DropdownPanel";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../assets/images/placeholder.svg";
import UserDetailTopbar from "./UserDetailTopbar";
import EditPermissions from "../permissions/EditPermissions";
import { showServerErrors } from "utils/errorsUtils";
import EditNotifications from "../permissions/EditNotifications";
import jwtDecode, { JwtDecodeOptions } from "jwt-decode";

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");
  const decodedToken: any = token && jwtDecode(token);

  useEffect(() => {
    usersService
      .getUser(id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!user) {
    return <InfoBoxPlaceholder />;
  }

  return (
    <ContentContainer
      title={`${user.FirstName} ${user.LastName}`}
      TopBar={<UserDetailTopbar user={user} IsActivate={user.IsActivate} />}
      path="/users"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image src={Placeholder} />

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={"Imię i nazwisko"}
              value={`${user.FirstName} ${user.LastName}`}
            />
            <InfoBox.InfoItem
              label={"Numer telefonu"}
              value={user.PhoneNumber}
            />
            <InfoBox.InfoItem label={"Stanowisko"} value={user.Position} />
            <InfoBox.InfoItem label={"Nick"} value={user.Nickname} />
            <InfoBox.InfoItem label={"Email"} value={user.Email} />
            <InfoBox.InfoItem
              label={"Status"}
              value={user.IsActivate ? "Aktywny" : "Nieaktywny"}
            />
            <InfoBox.InfoItem /> <InfoBox.InfoItem /> <InfoBox.InfoItem />
          </InfoBox.Items>
        </InfoBox>
        {(id === decodedToken.jti ||
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "2") && <EditNotifications user={user} />}

        {decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "2" && (
          <DropdownPanel
            label="Uprawnienia"
            // initialExpanded
          >
            <EditPermissions user={user} />
          </DropdownPanel>
        )}
      </div>
    </ContentContainer>
  );
};

export default UserDetail;
