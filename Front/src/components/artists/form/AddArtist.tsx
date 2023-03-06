import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import ArtistForm from "./ArtistForm";
import ContentContainer from "../../layout/ContentContainer";

import artistsService from "../../../services/artistServices";
import { getNotEmptyFields } from "../../../utils/objectUtils";
import {
  addArtistStatuses,
  ArtistStatus,
  artistStatusLabels,
  IArtist,
  IArtistRequest,
  ArtistInterface,
} from "../../../types/artistTypes";
import { ISelectOption } from "../../common/inputs/inputTypes";
import { showServerErrors } from "../../../utils/errorsUtils";

const AddArtist: React.FC = () => {
  const { goBack } = useHistory();
  const newArtist = {
    Email: "",
    FirstName: "",
    LastName: "",
    Language: 0,
    PhoneNumber: "",
    Theme: 0,
    Password: "",
    PasswordCopy: "",
  };

  const statusOptions: Array<ISelectOption> = addArtistStatuses.map(
    (key) => artistStatusLabels[key],
  );

  const handleSubmit = async (artistData: ArtistInterface) => {
    try {
      const newArtist = getNotEmptyFields(artistData);
      await artistsService.add(newArtist);
      toast.success(`Dodano nowego użytkownika!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title="Dodaj nowe konto użytkownika" path="/accounts">
      <ArtistForm
        //@ts-ignore
        artist={newArtist}
        statusOptions={statusOptions}
        //@ts-ignore
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </ContentContainer>
  );
};

export default AddArtist;
