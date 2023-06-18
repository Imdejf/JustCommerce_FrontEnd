import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Button from "../../common/buttons/basicButton/Button";

import { RootState } from "../../../store/store";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
} from "../../../types/userTypes";
import { showServerErrors } from "../../../utils/errorsUtils";
import { ButtonVariant } from "../../common/buttons/buttonTypes";
import usersService from "../../../services/usersService";
import playerProfileServices from "services/playerProfileServices";
import UserStatusInfo from "../status/UserStatusInfo";
import { useParams } from "react-router";
import BannedStatusInfo from "../status/BannedStatusInfo";

interface IUserDetailTopbarProps {
  playerProfile: PlayerProfileDetailInterface;
  IsActivate: boolean;
}

const PlayerProfilesDetailTopBar: React.FC<IUserDetailTopbarProps> = ({
  playerProfile,
  IsActivate,
}) => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();

  // const permissions = useSelector((state: RootState) => state.userPermissions);

  // if (!permissions) {
  //   return null;
  // }

  const handleRemove = async () => {
    try {
      await playerProfileServices.remove(id);
      toast.success("Usunięto profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleActivate = async () => {
    try {
      await playerProfileServices.activatePlayerProfile(id);
      toast.success("Odblokowano profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleDeactivate = async () => {
    try {
      await playerProfileServices.deactivatePlayerProfile(id);
      toast.success("Zablokowano profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleEdit = () => {
    push(`/player-profiles/edit/${id}`);
  };

  return (
    <div className="flex justify-between px-8 text-sm">
      <BannedStatusInfo isActive={!playerProfile.IsBanned} />
      <div className="flex gap-4">
        {/* @ts-ignore */}
        {!playerProfile.IsBanned ? (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            onClick={handleDeactivate}
            variant={ButtonVariant.Remove}
          >
            Zablokuj
          </Button>
        ) : (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            onClick={handleActivate}
            variant={ButtonVariant.Remove}
          >
            Odblokuj
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
          // disabled={!permissions.Auth.EditUser.checked}
          variant={ButtonVariant.Submit}
          className="flex-1 md:flex-grow-0 py-8 px-18"
        >
          Edytuj
        </Button>
      </div>
    </div>
  );
};

export default PlayerProfilesDetailTopBar;
