import React, { useEffect, useState } from "react";
import playerProfileService from "../../../services/playerProfileServices";

import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
  AcademyInterface,
} from "../../../types/userTypes";
import InfoBox from "../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../layout/ContentContainer";
import DropdownPanel from "../../common/panels/DropdownPanel";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../assets/images/placeholder.svg";
import PlayerProfilesTopBar from "./AcademiesDetailTopBar";

import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import RelatedProfilesTab from "./Tabs/PressMaterials/RelatedProfilesTab";
import AcademiesDetailTopBar from "./AcademiesDetailTopBar";
import academiesServices from "services/academiesServices";
import { showServerErrors } from "utils/errorsUtils";

const AcademiesDetail: React.FC = () => {
  const [playerProfile, setPlayerProfile] =
    useState<AcademyInterface | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    academiesServices
      .getSingleAcademy(id)
      .then((playerProfileData) => {
        // @ts-ignore
        setPlayerProfile(playerProfileData);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!playerProfile) {
    return <InfoBoxPlaceholder />;
  }
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

  const tabs = [
    {
      tab: {
        id: "address",
        label: "Informacje",
      },
      content: (
        //  @ts-ignore
        <RelatedProfilesTab playerProfile={playerProfile} />
      ),
    },

    {
      tab: {
        id: "payments1",
        label: "Zgody",
      },
      content: <></>,
    },
    {
      tab: {
        id: "payments2",
        label: "Płatności",
      },
      content: <></>,
    },
  ];

  return (
    <ContentContainer
      title={`${playerProfile.Name}`}
      TopBar={
        <AcademiesDetailTopBar
          playerProfile={playerProfile}
          IsActivate={false}
        />
      }
      path="/academies"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image
            src={
              playerProfile.FtpFilePath
                ? playerProfile.FtpFilePath
                : Placeholder
            }
          />

          <InfoBox.Items>
            <InfoBox.InfoItem label={"Nazwa"} value={`${playerProfile.Name}`} />
            <InfoBox.InfoItem
              label={"Typ"}
              value={`${typeSwitch(playerProfile.Type)}`}
            />
            <InfoBox.InfoItem
              label={"Email"}
              value={`${playerProfile.Email}`}
            />
            <InfoBox.InfoItem
              label={"Numer telefonu"}
              value={`${playerProfile.PhoneNumber}`}
            />
            <InfoBox.InfoItem label={"NIP"} value={`${playerProfile.NIP}`} />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
          </InfoBox.Items>
        </InfoBox>
        <TabsView>
          <Tabs tabs={tabs.map((t) => t.tab)} />

          <div style={{ padding: "40px 4vw 0" }}>
            {tabs.map((t) => t.content)}
          </div>
        </TabsView>
      </div>
    </ContentContainer>
  );
};

export default AcademiesDetail;
