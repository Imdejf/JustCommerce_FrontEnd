import { useEffect, useState } from "react";
import TabContent from "components/common/tabs/TabContent";
import DetailTable from "./DetailTable";
import {
  Countries,
  PlayerProfileDetailInterface,
} from "../../../../../types/userTypes";
import playerProfileServices from "services/playerProfileServices";

interface Props {
  playerCard: any;
}

const RelatedPlayerCard: React.FC<Props> = ({ playerCard }) => {
  const [countries, setCountries] = useState<Countries>();

  const getAllCountries = async () => {
    try {
      const resp = await playerProfileServices.getAllCountries();

      setCountries(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  console.log(playerCard);

  const dominantLegSwitch = (type: number) => {
    switch (type) {
      case 0:
        return "-";

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
      case 0:
        return "-";
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

  return (
    <TabContent id="playerCard">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <DetailTable
          label="Karta zawodnika"
          items={[
            {
              label: "Cel",
              value: playerCard?.Target ? playerCard.Target : "-",
            },
            {
              label: "Preferowana pozycja",
              value: `${prefferedPositionSwitch(
                playerCard?.PreferredPosition,
              )}`,
            },
            {
              label: "Noga dominująca",
              value: `${dominantLegSwitch(playerCard?.DominantLeg)}`,
            },
            {
              label: "Fifa id",
              value: playerCard?.FifaId ? playerCard.FifaId : "-",
            },
            {
              label: "Id zawodnika",
              value: playerCard?.PlayerId ? playerCard.PlayerId : "-",
            },

            {
              label: "Charakterystyka",
              value: playerCard?.Characteristics
                ? playerCard.Characteristics
                : "-",
            },
          ]}
        />
      </div>
    </TabContent>
  );
};

export default RelatedPlayerCard;
