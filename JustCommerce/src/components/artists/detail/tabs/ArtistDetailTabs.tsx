import { useSelector } from "react-redux";
import { RootState } from "store/store";

import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";

import { IArtist } from "types/artistTypes";
import Switch from "components/common/inputs/switch/Switch";
import PressMaterialsTab from "./PressMaterials/PressMaterialsTab";
import StoredFilesTab from "./StoredFilesTab";
import RelatedProductsTab from "./PressMaterials/RelatedProductsTab";
import RelatedProfilesTab from "./PressMaterials/RelatedProfilesTab";
import AgreementsTab from "./PressMaterials/AgreementsTab";
import PhotosPanel from "./PressMaterials/PhotosPanel";
import BiographyPanel from "./PressMaterials/BiographyPanel";
import PaymentsTab from "./PressMaterials/PaymentsTab";

const ArtistDetailTabs = (user: any) => {
  const permissions = useSelector(
    (state: RootState) => state.userPermissions?.Artist,
  );
  const { detail }: { detail: IArtist } = useSelector(
    (state: RootState) => state.artist,
  );

  // if (!permissions) {
  //   return null;
  // }

  const tabs = [
    {
      tab: {
        id: "relatedProfiles",
        label: "Powiązane profile",
      },
      content: <RelatedProfilesTab key="relatedProfiles" user={user} />,
    },
    {
      tab: {
        id: "agreements",
        label: "Zgody",
      },
      content: <AgreementsTab key="agreements" user={user} />,
    },
    {
      tab: {
        id: "payments",
        label: "Płatności",
      },
      content: <PaymentsTab key="payments" />,
    },
  ];

  // const filteredTabs = tabs.filter(({ tab }) => {
  //   const { CreatePresspack } = permissions;

  //   if (!CreatePresspack.checked && !detail.hasPresspack && tab.id === 'pressMaterials') return false;

  //   return true;
  // });
  return (
    <TabsView>
      <Tabs tabs={tabs.map((t) => t.tab)} />

      <div style={{ padding: "40px 4vw 0" }}>{tabs.map((t) => t.content)}</div>
    </TabsView>
  );
};

export default ArtistDetailTabs;
