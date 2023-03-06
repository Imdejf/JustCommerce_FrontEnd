import TabContent from "components/common/tabs/TabContent";
import DetailTable from "../../DetailTable";
import SwitchBlock from "components/common/inputs/switch/SwitchBlock";
import AgreementsDetailTable from "../AgreementsDetailTable";

const AgreementsTab = (user: any) => {
  const {
    AcceptedPrivatePolicyAndRegulation,
    InformationClausule,
    LaunchTask,
    MarketingDataProcessing,
    MarketingDataRecieving,
  } = user.user.user;
  return (
    <TabContent id="agreements">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <AgreementsDetailTable
          label="Zgody"
          items={[
            {
              label:
                "Oświadczam, że zapoznałam/łem się z Regulaminem oraz Polityką prywatności i akceptuję ich postanowienia",
              value: AcceptedPrivatePolicyAndRegulation,
            },
            {
              label:
                "Żądam uruchomienia usługi przed upływem terminu przysługującego mi prawa do odstąpienia od Kontraktu bez podania przyczyny. Rozumiem, że zgłoszenie żądania powoduje utratę prawa do odstąpienia.",
              value: InformationClausule,
            },
            {
              label:
                "Żądam uruchomienia usługi przed upływem terminu przysługującego mi prawa do odstąpienia od Kontraktu bez podania przyczyny. Rozumiem, że zgłoszenie żądania powoduje utratę prawa do odstąpienia.",
              value: LaunchTask,
            },
            {
              label:
                "Wyrażam zgodę na przekazywanie przez JUSTWIN sp. zo.o. w Wysogotowie, przy ulicy Wierzbowej 31, 62-081 Wysogotowo, treści marketingowych za pośrednictwem moich urządzeń telekomunikacyjnych, w szczególności takich jak laptop, telefon czy smartfon, zgodnie z art. 172 ust.1 ustawy z dnia 16 lipca 2004 r. Prawo telekomunikacyjne.",
              value: MarketingDataProcessing,
            },
            {
              label:
                "Wyrażam zgodę na otrzymywanie informacji handlowej od JUSTWIN sp. zo.o. z siedzibą w Wysogotowie, przy ul. Wierzbowej 31, 62-081 Wysogotowo, zgodnie z art. 10 ustawy z dnia 18 lipca 2002 r. o świadczeni  usług drogą elektroniczną.",
              value: MarketingDataRecieving,
            },
          ]}
        />
      </div>
    </TabContent>
  );
};

export default AgreementsTab;
