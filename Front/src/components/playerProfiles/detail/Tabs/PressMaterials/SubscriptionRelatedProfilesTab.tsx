import { useEffect, useState } from "react";
import TabContent from "components/common/tabs/TabContent";
import DetailTable from "./DetailTable";
import {
  Countries,
  PlayerProfileDetailInterface,
} from "../../../../../types/userTypes";
import playerProfileServices from "services/playerProfileServices";
import SubscriptionDetailTable from "./SubscriptionDetailTable";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

interface Props {
  playerProfile: PlayerProfileDetailInterface;
  refreshPlayerProfile: any;
}

const SubscriptionRelatedProfilesTab: React.FC<Props> = ({
  playerProfile,
  refreshPlayerProfile,
}) => {
  const { Subscriptions } = playerProfile;
  const [isAdded, setIsAdded] = useState(false);

  const addNewSubscription = async (
    id: string,
    fromDate: string,
    toDate: string,
  ) => {
    try {
      if (fromDate && toDate) {
        if (new Date(fromDate).getTime() <= new Date(toDate).getTime()) {
          await playerProfileServices.addNewSubscription(id, fromDate, toDate);
          toast.success("Dodano nową subskrypcje!");
          refreshPlayerProfile();
          setIsAdded(false);
          window.location.reload();
        } else {
          return toast.error(`Nieprawidłowe daty`);
        }
      } else {
        return toast.error("Uzupełnij dane!");
      }
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const removeSubscription = async (id: string) => {
    try {
      await playerProfileServices.removeSubscription(id);
      toast.success("Usunięto subskrypcje!");
      refreshPlayerProfile();
      window.location.reload();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };
  const compare = (a: any, b: any) => {
    if (a["value"] < b["value"]) {
      return 1;
    }
    if (a["value"] > b["value"]) {
      return -1;
    }
    return 0;
  };

  return (
    <TabContent id="payments">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        {playerProfile?.Subscriptions ? (
          <SubscriptionDetailTable
            isAdded={isAdded}
            setIsAdded={setIsAdded}
            removeSubscription={removeSubscription}
            addNewSubscription={addNewSubscription}
            label="Subskrypcje"
            items={Subscriptions.map((sub) => {
              return {
                label: `${sub.From.slice(0, 10)}, ${sub.From.slice(11, 19)}`,
                value: `${sub.To.slice(0, 10)}, ${sub.To.slice(11, 19)}`,
                value2: sub.Employee ? sub.Employee : "-",
                id: sub.SubscriptionId,
              };
            })
              .slice()
              .sort((a: any, b: any) => compare(a, b))}
          />
        ) : (
          <div>Nie ma żadnych subskrypcji.</div>
        )}
      </div>
    </TabContent>
  );
};

export default SubscriptionRelatedProfilesTab;
