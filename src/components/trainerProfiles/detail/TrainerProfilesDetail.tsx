import React, { useEffect, useState } from "react";
import playerProfileService from "../../../services/playerProfileServices";

import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
  PlayerCard,
  TrainerProfileDetailInterface,
} from "../../../types/userTypes";
import InfoBox from "../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../layout/ContentContainer";
import DropdownPanel from "../../common/panels/DropdownPanel";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../assets/images/placeholder.svg";
import PlayerProfilesTopBar from "./TrainerProfilesDetailTopbar";

import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import RelatedProfilesTab from "./Tabs/PressMaterials/RelatedProfilesTab";
import TrainerProfilesDetailTopBar from "./TrainerProfilesDetailTopbar";
import trainerProfileServices from "services/trainerProfileServices";
import StatisticsTab from "components/playerProfiles/detail/Tabs/PressMaterials/StatisticsTab";
import { showServerErrors } from "utils/errorsUtils";
import TrainerProfileRelations from "./Tabs/PressMaterials/TrainerProfileRelations";
import AgreementsTab from "./Tabs/PressMaterials/AgreementsTab";
import ProductDescription from "./Tabs/PressMaterials/ProductDescription";
import RelationsTab from "./Tabs/PressMaterials/RelationsTab";

const TrainerProfilesDetail: React.FC = () => {
  const [trainerProfile, setTrainerProfile] =
    useState<TrainerProfileDetailInterface | null>(null);
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    trainerProfileServices
      .getSingleTrainerProfile(id)
      .then((playerProfileData) => {
        // @ts-ignore
        setTrainerProfile(playerProfileData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  // useEffect(() => {
  //   trainerProfileServices
  //     .getTrainerCard(id)
  //     .then((playerCardData) => {
  //       // @ts-ignore
  //       setPlayerCard(playerCardData);
  //     })
  //     .catch((errors: any) => {
  //       showServerErrors(errors);
  //     });
  // }, [id]);

  if (!trainerProfile) {
    return <InfoBoxPlaceholder />;
  }

  const genderSwitch = (gender: number) => {
    switch (gender) {
      case 0:
        return "Mężczyzna";
      case 1:
        return "Kobieta";

      default:
        return `${gender}`;
    }
  };

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

  const tabs = [
    {
      tab: {
        id: "address",
        label: "Adres",
      },
      content: (
        //  @ts-ignore
        <RelatedProfilesTab trainerProfile={trainerProfile} />
      ),
    },

    {
      tab: {
        id: "agreements",
        label: "Zgody",
      },
      content: (
        <AgreementsTab key="agreements" trainerProfile={trainerProfile} />
      ),
    },
    {
      tab: {
        id: "payments2",
        label: "Płatności",
      },
      content: <></>,
    },
    {
      tab: {
        id: "menager",
        label: "Menadżer",
      },
      content: (
        <></>
        // <TabContent id="menager">
        //   <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        //     <RelationsTab
        //       playerProfile={playerProfile}
        //       refreshPlayerProfile={refreshPlayerProfile}
        //     />
        //   </div>
        // </TabContent>
      ),
    },
    {
      tab: {
        id: "description",
        label: "O mnie",
      },
      content: (
        <TabContent id="description">
          <div
            className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
            style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
          >
            <ProductDescription
              order={{
                Description: trainerProfile?.Description
                  ? trainerProfile.Description
                  : "Brak opisu",
              }}
            />
          </div>
        </TabContent>
      ),
    },
    {
      tab: {
        id: "relations",
        label: "Powiązania",
      },
      content: (
        <TabContent id="relations">
          <TrainerProfileRelations
            label="Powiązania"
            items={trainerProfile.AllowedUsers}
          />
        </TabContent>
      ),
    },
  ];

  return (
    <ContentContainer
      title={`${trainerProfile.FirstName} ${trainerProfile.LastName}`}
      TopBar={
        <TrainerProfilesDetailTopBar
          trainerProfile={trainerProfile}
          IsActivate={trainerProfile.IsVerified}
        />
      }
      path="/trainer-profiles"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image
            src={
              trainerProfile.PhotoFilePath
                ? trainerProfile.PhotoFilePath
                : Placeholder
            }
          />

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={"Imię i nazwisko"}
              value={`${trainerProfile.FirstName} ${trainerProfile.LastName}`}
            />
            <InfoBox.InfoItem
              label={"Email"}
              value={trainerProfile.Contact.Email}
            />

            <InfoBox.InfoItem
              label={"Numer telefonu"}
              value={trainerProfile.Contact.PhoneNumber}
            />
            <InfoBox.InfoItem
              label={"Dyscyplina"}
              value={
                trainerProfile?.DisciplineName
                  ? trainerProfile.DisciplineName
                  : "-"
              }
            />
            <InfoBox.InfoItem
              label={"Licencja"}
              value={trainerProfile?.LicenseId ? trainerProfile.LicenseId : "-"}
            />
            <InfoBox.InfoItem
              label={"Data przystąpienia"}
              value={trainerProfile.Created.slice(0, 10)}
            />

            {/* <InfoBox.InfoItem
              label={"Dyscyplina"}
              value={
                playerCard?.Discipline ? playerCard.Discipline : "nie podano"
              }
            />

            <InfoBox.InfoItem
              label={"Id urządzenia"}
              value={
                trainerProfile.Device.Uuid
                  ? trainerProfile.Device.Uuid
                  : "nie podano"
              }
            />

            <InfoBox.InfoItem
              label={"Płeć"}
              value={genderSwitch(trainerProfile.Gender)}
            />

            <InfoBox.InfoItem
              label={"Cel"}
              value={playerCard?.Target ? playerCard.Target : "nie podano"}
            />

            <InfoBox.InfoItem />

            <InfoBox.InfoItem
              label={"Data urodzenia"}
              value={trainerProfile.Birthdate}
            />

            <InfoBox.InfoItem
              label={"Data przystąpienia"}
              value={
                trainerProfile.Device
                  ? trainerProfile.Device.ConnectedDate
                  : "nie podano"
              }
            /> */}
            {/* <InfoBox.InfoItem /> */}
            {/* <InfoBox.InfoItem
              label={"Email"}
              value={
                trainerProfile.Contact.Email
                  ? trainerProfile.Contact.Email
                  : "nie podano"
              }
            />
           
           
           
            <InfoBox.InfoItem
              label={"Urządzenie"}
              value={
                trainerProfile.Device
                  ? trainerProfile.Device.DeviceName
                  : "nie podano"
              }
            /> */}
            {/* <InfoBox.InfoItem label={"Typ profilu"} value={typeSwitch(trainerProfile.Type)}/> */}
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

export default TrainerProfilesDetail;
