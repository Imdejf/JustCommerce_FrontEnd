import TabContent from "components/common/tabs/TabContent";

import BiographyPanel from "./BiographyPanel";
import PhotosPanel from "./PhotosPanel";

const PressMaterialsTab = () => {
  return (
    <TabContent id="supplementaryData">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <div className="w-full" style={{ maxWidth: "500px" }}>
          <BiographyPanel />
        </div>
        <PhotosPanel />
      </div>
    </TabContent>
  );
};

export default PressMaterialsTab;
