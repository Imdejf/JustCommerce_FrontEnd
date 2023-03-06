import { useEffect, useState } from "react";
import TabContent from "components/common/tabs/TabContent";
import DetailTable from "./DetailTable";
import {
  Countries,
  OrderInterface,
  PlayerProfileDetailInterface,
} from "../../../../../../types/userTypes";
import playerProfileServices from "services/playerProfileServices";
import TrackingDetailTable from "./TrackingDetailTable";

interface Props {
  order: OrderInterface;
}

const RelatedProfilesTab: React.FC<Props> = ({ order }) => {
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

  const { Name, Netto, Deadline } = order.Delivery;
  const { PhoneNumber, Email } = order.User;
  const {
    Country,
    City,
    Region,
    PostCode,
    Street,
    BuildingNumber,
    FlatNumber,
  } = order.Address;
  return (
    <TabContent id="delivery">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <DetailTable
          label="Dostawa"
          items={[
            {
              label: "Nazwa",

              value: Name,
            },
            {
              label: "Koszt dostawy",
              value: `${
                Netto === 0
                  ? "darmowa"
                  : `${new Intl.NumberFormat("fr-CA", {
                      minimumFractionDigits: 2,
                    }).format(Netto)}`
              }`,
            },
            {
              label: "Termin",
              value: `${Deadline} H`,
            },
          ]}
        />
        <TrackingDetailTable
          label="Adres"
          order={order}
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
              value: `${BuildingNumber}`,
            },
            {
              label: "Numer mieszkania",
              value: `${FlatNumber}`,
            },
            {
              label: "Numer telefonu",
              value: PhoneNumber,
            },
            {
              label: "Adres mailowy",
              value: Email,
            },
          ]}
        />
      </div>
    </TabContent>
  );
};

export default RelatedProfilesTab;
