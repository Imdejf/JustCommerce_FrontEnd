import React, { useEffect, useState } from "react";
import playerProfileService from "../../../services/playerProfileServices";

import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
  PlayerCard,
} from "../../../types/userTypes";
import InfoBox from "../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../layout/ContentContainer";
import DropdownPanel from "../../common/panels/DropdownPanel";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../assets/images/placeholder.svg";
import PlayerProfilesTopBar from "./PlayerProfilesDetailTopbar";

import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import RelatedProfilesTab from "./Tabs/PressMaterials/RelatedProfilesTab";
import CareerTab from "./Tabs/PressMaterials/CareerTab";
import StatisticsTab from "./Tabs/PressMaterials/StatisticsTab";
import SubscriptionRelatedProfilesTab from "./Tabs/PressMaterials/SubscriptionRelatedProfilesTab";
import RelationsTab from "./Tabs/PressMaterials/RelationsTab";
import { showServerErrors } from "utils/errorsUtils";
import RelatedPlayerCard from "./Tabs/PressMaterials/RelatedPlayerCard";
import PlayerProfileRelations from "./Tabs/PressMaterials/PlayerProfileRelations";

const PlayerProfilesDetail: React.FC = () => {
  const [playerProfile, setPlayerProfile] =
    useState<PlayerProfileDetailInterface | null>(null);
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    playerProfileService
      .getSinglePlayerProfile(id)
      .then((playerProfileData) => {
        setPlayerProfile(playerProfileData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  const refreshPlayerProfile = () => {
    playerProfileService
      .getSinglePlayerProfile(id)
      .then((playerProfile: any) => {
        setPlayerProfile((prev: any) => ({
          ...prev,
          Subscriptions: playerProfile.Subscriptions,
          AcademyRelations: playerProfile.AcademyRelations,
          TrainerRelations: playerProfile.TrainerRelations,
        }));
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  };

  useEffect(() => {
    playerProfileService
      .getPlayerCard(id)
      .then((playerCardData) => {
        setPlayerCard(playerCardData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!playerProfile) {
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

  const dominantLegSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Prawa";

      case 2:
        return "Lewa";
      case 3:
        return "Obie";
      default:
        return `${type}`;
    }
  };

  const prefferedPositionSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Bramkarz";

      case 2:
        return "Obrońca";
      case 3:
        return "Pomocnik";
      case 4:
        return "Napastnik";
      default:
        return `${type}`;
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
        <RelatedProfilesTab playerProfile={playerProfile} />
      ),
    },

    {
      tab: {
        id: "payments",
        label: "Licencja",
      },
      content: (
        <SubscriptionRelatedProfilesTab
          refreshPlayerProfile={refreshPlayerProfile}
          playerProfile={playerProfile}
        />
      ),
    },
    {
      tab: {
        id: "menager",
        label: "Menedżer",
      },
      content: (
        <TabContent id="menager">
          <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
            <RelationsTab
              playerProfile={playerProfile}
              refreshPlayerProfile={refreshPlayerProfile}
            />
          </div>
        </TabContent>
      ),
    },
    {
      tab: {
        id: "career",
        label: "Kariera",
      },
      content: <CareerTab id={id} />,
    },
    {
      tab: {
        id: "statistics",
        label: "Statystyki",
      },
      content: (
        <StatisticsTab
          playerProfile={playerProfile}
          ownerId={playerProfile.OwnerId}
        />
      ),
    },

    {
      tab: {
        id: "playerCard",
        label: "Karta zawodnika",
      },
      content: (
        //  @ts-ignore
        <RelatedPlayerCard playerCard={playerCard} />
      ),
    },
    {
      tab: {
        id: "relations",
        label: "Powiązania",
      },
      content: (
        <TabContent id="relations">
          <PlayerProfileRelations
            label="Powiązania"
            items={playerProfile.AllowedUsers}
          />
        </TabContent>
      ),
    },
  ];

  return (
    <ContentContainer
      title={`${playerProfile.FirstName} ${playerProfile.LastName}`}
      TopBar={
        <PlayerProfilesTopBar
          playerProfile={playerProfile}
          IsActivate={false}
        />
      }
      path="/player-profiles"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image
            src={
              playerProfile.FtpPhotoFilePath
                ? playerProfile.FtpPhotoFilePath
                : Placeholder
            }
          />

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={"Imię i nazwisko"}
              value={`${playerProfile.FirstName} ${playerProfile.LastName}`}
            />

            <InfoBox.InfoItem
              label={"Dyscyplina"}
              value={
                playerCard?.Discipline && playerCard.Discipline.Name
                  ? playerCard.Discipline.Name
                  : "-"
              }
            />

            <InfoBox.InfoItem
              label={"Płeć"}
              value={genderSwitch(playerProfile.Gender)}
            />

            <InfoBox.InfoItem
              label={"Data urodzenia"}
              value={playerProfile.Birthdate}
            />
            <InfoBox.InfoItem
              label={"Licencja"}
              value={playerProfile.IsActivated ? "Tak" : "Nie"}
            />
            <InfoBox.LongInfoItem
              label={"Id urządzenia"}
              value={
                playerProfile.Device?.Uuid ? playerProfile.Device.Uuid : "-"
              }
            />

            {/* <InfoBox.InfoItem
              label={"Cel"}
              value={playerCard?.Target ? playerCard.Target : "-"}
            /> */}

            {/* <InfoBox.InfoItem
              label={"Preferowana pozycja"}
              value={
                playerCard?.PreferredPosition
                  ? prefferedPositionSwitch(playerCard.PreferredPosition)
                  : "-"
              }
            /> */}

            {/* <InfoBox.InfoItem
              label={"Noga dominująca"}
              value={
                playerCard?.DominantLeg
                  ? dominantLegSwitch(playerCard.DominantLeg)
                  : "-"
              }
            /> */}
            {/* <InfoBox.InfoItem
              label={"Zawodnik zrzeszony"}
              value={playerCard?.IsPlayerAssociated ? "Tak" : "Nie"}
            /> */}
            {/* <InfoBox.InfoItem
              label={"Fifa Id"}
              value={playerCard?.FifaId ? playerCard.FifaId : "-"}
            /> */}

            {/* <InfoBox.InfoItem
              label={"Data przystąpienia"}
              value={
                playerProfile.Device
                  ? playerProfile.Device.ConnectedDate
                  : "nie podano"
              }
            /> */}

            {/* <InfoBox.InfoItem
              label={"Email"}
              value={
                playerProfile.Contact.Email
                  ? playerProfile.Contact.Email
                  : "nie podano"
              }
            />
           
           */}

            {/* <InfoBox.InfoItem
              label={"Urządzenie"}
              value={
                playerProfile.Device?.DeviceName
                  ? playerProfile.Device.DeviceName
                  : "-"
              }
            /> */}

            {/* <InfoBox.InfoItem label={"Typ profilu"} value={typeSwitch(playerProfile.Type)}/> */}
          </InfoBox.Items>
        </InfoBox>
        <TabsView>
          <Tabs tabs={tabs.map((t) => t.tab)} />

          <div style={{ padding: "20px 3vw 0" }}>
            {tabs.map((t) => t.content)}
          </div>
        </TabsView>
      </div>
    </ContentContainer>
  );
};

export default PlayerProfilesDetail;
