import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ArtistForm from "./ArtistForm";
import ContentContainer from "components/layout/ContentContainer";

import artistsService from "services/artistServices";
import { artistFromDTO } from "utils/artistUtils";
import { getNotEmptyFields } from "utils/objectUtils";
import { showServerErrors } from "utils/errorsUtils";
import { ISelectOption } from "components/common/inputs/inputTypes";
import {
  ArtistInterface,
  artistStatusLabels,
  editArtistStatuses,
  IArtist,
  IArtistRequest,
} from "types/artistTypes";

const EditArtist: React.FC = () => {
  const [artist, setArtist] = useState<ArtistInterface | null>(null);
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();

  const statusOptions: Array<ISelectOption> = editArtistStatuses.map(
    (key) => artistStatusLabels[key],
  );
  //@ts-ignore
  const handleSubmit = async (artistData) => {
    try {
      await artistsService.edit(artistData);
      toast.success(`Edytowano użytkownika!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  useEffect(() => {
    artistsService
      .get(id)
      .then((artistData) => {
        if (artistData) {
          //@ts-ignore
          const formattedArtist = artistFromDTO(artistData);

          setArtist(formattedArtist);
        }
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  return (
    artist && (
      <ContentContainer
        title="Edycja użytkownika"
        path={`/accounts/detail/${id}`}
      >
        <ArtistForm
          artist={artist}
          onSubmit={handleSubmit}
          statusOptions={statusOptions}
          isEdit={true}
        />
      </ContentContainer>
    )
  );
};

export default EditArtist;
