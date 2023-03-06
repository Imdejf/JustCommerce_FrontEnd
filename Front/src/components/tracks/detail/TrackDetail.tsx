import React, { useEffect, useState } from "react";
import trackServices from "../../../services/trackServices";

import { ITrack } from "../utils/trackTypes";
import InfoBox from "../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../layout/ContentContainer";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../assets/images/placeholder.png";
import TrackDetailTopbar from "./TrackDetailTopbar";
import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import Table from "components/common/table/Table";
import StatusInfo from "components/statusInfo/StatusInfo";
import { showServerErrors } from "utils/errorsUtils";

const TrackDetail: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    trackServices
      .get(id)
      .then((trackData) => {
        setTrack(trackData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!track) {
    return <InfoBoxPlaceholder />;
  }
  return (
    <ContentContainer
      title={track.title}
      TopBar={<TrackDetailTopbar track={track} />}
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image src={Placeholder} />

          <InfoBox.Items>
            {/* <InfoBox.InfoItem label={TrackLabels.name} value={track.name} />
            <InfoBox.InfoItem
              label={TrackLabels.contact}
              value={`${track.contactFirstName} ${track.contactLastName}
              `}
            />
            <InfoBox.InfoItem label={TrackLabels.email} value={track.email} />
            <InfoBox.InfoItem label={TrackLabels.phoneNumber} value={track.phoneNumber} />
            <InfoBox.InfoItem label={TrackLabels.type} value={`${track.type}`} />
            <InfoBox.InfoItem label={TrackLabels.identifier[track.type]} value={track.identifier} />

            <InfoBox.InfoItem label={TrackLabels.city} value={track.address.city} />
            <InfoBox.InfoItem label={TrackLabels.country} value={Country[track.address.country]} />
            <InfoBox.InfoItem label={TrackLabels.postCode} value={track.address.postCode} />
            <InfoBox.InfoItem label={TrackLabels.street} value={track.address.street} /> */}
          </InfoBox.Items>
        </InfoBox>
      </div>

      <TabsView>
        <Tabs tabs={[{ id: "salesChannel", label: "Kanały sprzedaży" }]} />
        <TabContent id="salesChannel">
          <div className="mt-14">
            <Table
              headers={[
                { label: "Nazwa", key: "name", sortable: true },
                { label: "Liczba produktów", key: "products" },
                { label: "Status", key: "status" },
              ]}
              rows={[
                {
                  cols: [
                    {
                      content: "Jakaś nazwa",
                      key: "name",
                      title: "Jakaś nazwa",
                    },
                    { content: "100", key: "products", title: "" },
                    {
                      content: (
                        <StatusInfo
                          className="flex gap-x-2 px-8 md: -ml-4 md:pl-3/10 lg:pl-4/10 "
                          status={"true"}
                        />
                      ),
                      key: "status",
                      title: "",
                    },
                  ],
                },
              ]}
            />
          </div>
        </TabContent>
      </TabsView>
    </ContentContainer>
  );
};

export default TrackDetail;
