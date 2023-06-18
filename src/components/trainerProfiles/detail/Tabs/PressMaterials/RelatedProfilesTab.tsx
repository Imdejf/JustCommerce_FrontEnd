import { useEffect, useState } from "react";
import TabContent from "components/common/tabs/TabContent";
import DetailTable from "./DetailTable";
import {
  Countries,
  PlayerProfileDetailInterface,
  TrainerProfileDetailInterface,
} from "../../../../../types/userTypes";
import playerProfileServices from "services/playerProfileServices";

interface Props {
  trainerProfile: TrainerProfileDetailInterface;
}

const RelatedProfilesTab: React.FC<Props> = ({ trainerProfile }) => {
  const [countries, setCountries] = useState<Countries>();
  // const {
  //   Country,
  //   City,
  //   Region,
  //   PostCode,
  //   Street,
  //   BuildingNumber,
  //   FlatNumber,
  // } = playerProfile.playerProfile.Address;

  // const getAllCountries = async () => {
  //   try {
  //     const resp = await playerProfileServices.getAllCountries();

  //     setCountries(resp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllCountries();
  // }, []);

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
              value: `${
                trainerProfile?.Address?.City
                  ? trainerProfile.Address.City
                  : "-"
              }`,
            },
            {
              label: "Województwo",
              value: `${
                trainerProfile?.Address?.Region
                  ? trainerProfile.Address.Region
                  : "-"
              }`,
            },
            {
              label: "Kod pocztowy",
              value: `${
                trainerProfile?.Address?.PostCode
                  ? trainerProfile.Address.PostCode
                  : "-"
              }`,
            },
            {
              label: "Ulica",
              value: `${
                trainerProfile?.Address?.Street
                  ? trainerProfile.Address.Street
                  : "-"
              }`,
            },
            {
              label: "Numer budynku",
              value: `${
                trainerProfile?.Address?.BuildingNumber
                  ? trainerProfile.Address.BuildingNumber
                  : "-"
              }`,
            },
            {
              label: "Numer mieszkania",
              value: `${
                trainerProfile?.Address?.FlatNumber
                  ? trainerProfile.Address.FlatNumber
                  : "-"
              }`,
            },
          ]}
        />
      </div>
    </TabContent>
  );
};

export default RelatedProfilesTab;
