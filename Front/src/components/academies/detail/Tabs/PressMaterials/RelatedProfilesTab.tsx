import { useEffect, useState } from "react";
import TabContent from "components/common/tabs/TabContent";
import DetailTable from "./DetailTable";
import {
  Countries,
  PlayerProfileDetailInterface,
} from "../../../../../types/userTypes";
import playerProfileServices from "services/playerProfileServices";

const RelatedProfilesTab = (playerProfile: any) => {
  const [countries, setCountries] = useState<Countries>();
  const {
    Country,
    City,
    Region,
    PostCode,
    Street,
    BuildingNumber,
    FlatNumber,
  } = playerProfile.playerProfile;

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

  return (
    <TabContent id="address">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <DetailTable
          label="Adres"
          items={[
            {
              label: "Kraj",
              value: `Polska`,
            },
            {
              label: "Miasto",
              value: City,
            },
            {
              label: "Województwo",
              value: Region,
            },
            {
              label: "Kod pocztowy",
              value: PostCode,
            },
            {
              label: "Ulica",
              value: Street,
            },
            {
              label: "Numer budynku",
              value: BuildingNumber,
            },
            {
              label: "Numer mieszkania",
              value: FlatNumber,
            },
          ]}
        />
      </div>
    </TabContent>
  );
};

export default RelatedProfilesTab;
