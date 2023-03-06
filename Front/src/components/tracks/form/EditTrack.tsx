import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ContentContainer from "components/layout/ContentContainer";

import tracksService from "services/trackServices";
import { getNotEmptyFields } from "utils/objectUtils";
import { showServerErrors } from "utils/errorsUtils";
import { ITrack, TrackRequest } from "components/tracks/utils/trackTypes";

import TrackForm from "./TrackForm";

const EditTrack: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async ({ id, ...track }: TrackRequest) => {
    try {
      const newTrack = {
        ...getNotEmptyFields(track),
      };
      await tracksService.edit({ trackId: id, ...newTrack });
      toast.success(`Poprawnie edytowano utwór!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  useEffect(() => {
    tracksService
      .get(id)
      .then((trackData) => {
        if (trackData) {
          setTrack(trackData);
        }
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  return (
    track && (
      <ContentContainer title="Edycja utworu">
        <TrackForm track={track} onSubmit={handleSubmit} isEdit={true} />
      </ContentContainer>
    )
  );
};

export default EditTrack;
