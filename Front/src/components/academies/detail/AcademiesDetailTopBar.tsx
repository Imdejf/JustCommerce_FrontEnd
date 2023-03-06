import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Button from "../../common/buttons/basicButton/Button";

import { RootState } from "../../../store/store";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
  AcademyInterface,
} from "../../../types/userTypes";
import { showServerErrors } from "../../../utils/errorsUtils";
import { ButtonVariant } from "../../common/buttons/buttonTypes";
import usersService from "../../../services/usersService";
import playerProfileServices from "services/playerProfileServices";
import UserStatusInfo from "../status/UserStatusInfo";
import { useParams } from "react-router";
import academiesServices from "services/academiesServices";

interface IUserDetailTopbarProps {
  playerProfile: AcademyInterface;
  IsActivate: boolean;
}

const AcademiesDetailTopBar: React.FC<IUserDetailTopbarProps> = ({
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
      await academiesServices.remove(id);
      toast.success("Usunięto akademie!");
      push("/academies");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  // const handleActivate = async () => {
  //   try {
  //     await usersService.activateUser(playerProfile.UserId);
  //     toast.success("Aktywowano pracownika");
  //     push("/users");
  //   } catch (errors: any) {
  //     showServerErrors(errors);
  //   }
  // };

  // const handleDeactivate = async () => {
  //   try {
  //     await usersService.deactivateUser(playerProfile.UserId);
  //     toast.success("Deaktywowano pracownika");
  //     push("/users");
  //   } catch (errors: any) {
  //     showServerErrors(errors);
  //   }
  // };

  const handleEdit = () => {
    push(`/academies/edit/${id}`);
  };

  return (
    <div className="flex justify-between px-8 text-sm">
      <UserStatusInfo isActive={IsActivate} />
      <div className="flex gap-4">
        {/* {IsActivate ? (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            // onClick={handleDeactivate}
            variant={ButtonVariant.Remove}
          >
            Dezaktywuj
          </Button>
        ) : (
          <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            // onClick={handleActivate}
            variant={ButtonVariant.Remove}
          >
            Aktywuj
          </Button>
        )} */}

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

export default AcademiesDetailTopBar;
