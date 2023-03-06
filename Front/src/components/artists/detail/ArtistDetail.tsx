import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import ContentContainer from "components/layout/ContentContainer";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import artistsService from "../../../services/artistServices";
import { ArtistLabels, IArtist, ArtistInterface } from "types/artistTypes";

import Placeholder from "assets/images/placeholder.svg";
import { getArtistDetail, getPresspack } from "store/actions/artistActions";

import ArtistDetailTopbar from "./ArtistDetailTopbar";
import ArtistDetailTabs from "./tabs/ArtistDetailTabs";
import { showServerErrors } from "utils/errorsUtils";

const ArtistDetail: React.FC = () => {
  const [user, setUser] = useState<ArtistInterface | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    artistsService
      .get(id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!user) return <InfoBoxPlaceholder />;

  return (
    <ContentContainer
      title={`${user.FirstName} ${user.LastName}`}
      TopBar={<ArtistDetailTopbar artist={user} />}
      path="/accounts"
    >
      <div className="flex flex-col">
        <InfoBox className="bg-white bg-opacity-60 p-18">
          <InfoBox.Image src={Placeholder} />

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={ArtistLabels.firstName}
              value={user.FirstName}
            />
            <InfoBox.InfoItem
              label={ArtistLabels.phoneNumber}
              value={user.PhoneNumber}
            />
            <InfoBox.InfoItem label={ArtistLabels.email} value={user.Email} />

            <InfoBox.InfoItem
              label={ArtistLabels.lastName}
              value={user.LastName}
            />
            <InfoBox.InfoItem
              label={"Data utworzenia"}
              value={user?.Created?.slice(0, 10)}
            />
            <InfoBox.InfoItem />

            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
            <InfoBox.InfoItem />
          </InfoBox.Items>
        </InfoBox>

        <ArtistDetailTabs user={user} />
      </div>
    </ContentContainer>
  );
};

export default ArtistDetail;
