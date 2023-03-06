import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Button from "../../../common/buttons/basicButton/Button";

import { RootState } from "../../../../store/store";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
} from "../../../../types/userTypes";
import { showServerErrors } from "../../../../utils/errorsUtils";
import { ButtonVariant } from "../../../common/buttons/buttonTypes";
import usersService from "../../../../services/usersService";
import playerProfileServices from "services/playerProfileServices";
import UserStatusInfo from "../status/UserStatusInfo";
import { useParams } from "react-router";

interface IUserDetailTopbarProps {
  IsActivate: boolean;
  status: number;
}

const OrdersDetailTopBar: React.FC<IUserDetailTopbarProps> = ({
  IsActivate,
  status,
}) => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();

  // const permissions = useSelector((state: RootState) => state.userPermissions);

  // if (!permissions) {
  //   return null;
  // }
  const statusSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Opłacony";

      case 2:
        return "Oczekuje na zapłate";

      case 3:
        return "Otwarty";

      case 4:
        return "Przetwarzany";

      case 5:
        return "Anulowany";

      case 6:
        return "Wstrzymany";

      case 7:
        return "Gotowy do wysłania";

      case 8:
        return "W drodze";

      case 9:
        return "Dostarczony";

      case 10:
        return "Zakończony";

      default:
        return type;
    }
  };

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
      toast.success("Aktywowano profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleDeactivate = async () => {
    try {
      await playerProfileServices.deactivatePlayerProfile(id);
      toast.success("Dezaktywowano profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleEdit = () => {
    push(`/player-profiles/edit/${id}`);
  };

  return (
    <div className="flex justify-end px-8 text-sm">
      {/* <UserStatusInfo isActive={playerProfile.IsActivated} /> */}
      <div className="flex gap-4">
        {/* {playerProfile.IsActivated ? (
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
        )} */}
        {/* <Button
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
        </Button> */}
        Status: {statusSwitch(status)}
      </div>
    </div>
  );
};

export default OrdersDetailTopBar;
