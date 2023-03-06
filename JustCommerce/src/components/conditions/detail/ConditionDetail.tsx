import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import ContentContainer from "components/layout/ContentContainer";
import ConditionDetailTopbar from "./ConditionDetailTopbar";
import DetailTable from "components/artists/detail/DetailTable";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import TabContent from "components/common/tabs/TabContent";
import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";

import conditionsService from "services/conditionsServices";
import { ConditionTemplate } from "types/conditionTypes";

import Placeholder from "assets/images/placeholder.png";

const ConditionDetail = () => {
  const [condition, setCondition] = useState<null | ConditionTemplate>(null);
  const { id } = useParams<{ id: string }>();

  const fetchCondition = useCallback(async () => {
    const res = await conditionsService.get(id);
    setCondition(res);
  }, [id]);

  useEffect(() => {
    fetchCondition();
  }, [fetchCondition]);

  if (!condition) {
    return <InfoBoxPlaceholder />;
  }

  return (
    <ContentContainer
      title={condition.name}
      TopBar={<ConditionDetailTopbar condition={condition} />}
    >
      <div className="flex flex-col">
        <InfoBox className="bg-white bg-opacity-60 p-18">
          <InfoBox.Image src={Placeholder} />

          <InfoBox.Items>
            <InfoBox.InfoItem label={"Nazwa"} value={condition.name} />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />

            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />

            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
          </InfoBox.Items>
        </InfoBox>

        <TabsView>
          <Tabs
            tabs={[
              {
                id: "relatedProducts",
                label: "Produkty",
              },
            ]}
          />

          <div style={{ padding: "40px 4vw 0" }}>
            <TabContent id="relatedProducts">
              <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
                <DetailTable
                  label="Produkty"
                  items={Array.from({ length: 4 }).map(() => ({
                    label: "Tytuł",
                    value: "Przygotowane pod integrację",
                  }))}
                />
              </div>
            </TabContent>
          </div>
        </TabsView>
      </div>
    </ContentContainer>
  );
};

export default ConditionDetail;
