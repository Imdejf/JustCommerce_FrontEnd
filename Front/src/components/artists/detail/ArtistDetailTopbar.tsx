import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../store/store";
import artistsService from "../../../services/artistServices";
import ArtistStatusInfo from "../ArtistStatusInfo";
import Button from "../../common/buttons/basicButton/Button";
import { toast } from "react-toastify";
import { showServerErrors } from "../../../utils/errorsUtils";
import { ButtonVariant } from "../../common/buttons/buttonTypes";
import { IArtist, ArtistInterface } from "../../../types/artistTypes";

interface IArtistDetailTopbarProps {
  artist: ArtistInterface;
}

const ArtistDetailTopbar: React.FC<IArtistDetailTopbarProps> = ({ artist }) => {
  const { push } = useHistory();
  // const permissions = useSelector((state: RootState) => state.userPermissions);

  // if (!permissions) {
  //   return null;
  // }

  const handleEdit = () => {
    push(`/accounts/edit/${artist.Id}`);
  };

  const handleRemove = async () => {
    try {
      await artistsService.remove(artist.Id);
      toast.success("Usunięto użytkownika");
      push("/accounts");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleActivate = async () => {
    try {
      await artistsService.activateArtist(artist.Id);
      toast.success("Aktywowano użytkownika");
      push("/accounts");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleDeactivate = async () => {
    try {
      await artistsService.deactivateArtist(artist.Id);
      toast.success("Deaktywowano użytkownika");
      push("/accounts");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <div className="flex justify-between px-8 text-sm">
      <ArtistStatusInfo className="px-8 md:px-12" artist={artist} />

      <div className="flex gap-4">
        {artist.IsActive ? (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            onClick={handleDeactivate}
            variant={ButtonVariant.Remove}
          >
            Dezaktywuj
          </Button>
        ) : (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            onClick={handleActivate}
            variant={ButtonVariant.Remove}
          >
            Aktywuj
          </Button>
        )}

        <Button
          className="flex-1 md:flex-grow-0 py-8 px-18"
          // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
          onClick={handleRemove}
          variant={ButtonVariant.Remove}
        >
          Usuń
        </Button>

        <Button
          onClick={handleEdit}
          // disabled={!permissions.Artist.Edit.checked}
          variant={ButtonVariant.Submit}
          className="flex-1 md:flex-grow-0 py-8 px-18"
        >
          Edytuj
        </Button>
      </div>
    </div>
  );
};

export default ArtistDetailTopbar;
