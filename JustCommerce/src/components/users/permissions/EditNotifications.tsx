import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

import SubmitButton from "../../common/buttons/submitButton/SubmitButton";
import SwitchBlock from "../../common/inputs/switch/SwitchBlock";
import AssignToProfileSelect from "./AssignToProfileSelect";
import PermissionSection from "./PermissionSection";

import permissionService from "../../../services/permissionServices";
import {
  PermissionsLabels,
  permissoinsFromDTO,
} from "../../../utils/permissionsUtils";
import { ICheckboxValue } from "../../../types/globalTypes";
import {
  IPermissions,
  PermissionsDomainsShort,
  IPermissionTransformDTO,
  IPermissionsActionTypes,
} from "../../../types/permissionsTypes";
import { useDispatch } from "react-redux";
import { changePermissions } from "../../../store/actions/permissions";
import permissionsServices from "services/permissionsServices";
import FormSection from "components/common/forms/FormSection";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { Permission, UserInterface } from "types/userTypes";
import {
  translateDomainNames,
  translateFlagNames,
} from "./PermissionsTranslate";
import NotificationSwitchBlock from "components/common/inputs/switch/NotificationSwitchBlock";

interface Props {
  user: UserInterface;
}

const EditNotifications: React.FC<Props> = ({ user }) => {
  const [initState, setInitState] =
    useState<IPermissions<ICheckboxValue<number>> | null>(null);
  const [changed, setChanged] = useState<IPermissionTransformDTO>({});

  const [selectedItem, setSelectedItem] =
    useState<{ value: number; label: string } | null>(null);
  const [profiles, setProfiles] = useState([]);
  const [domainNames, setDomainNames] = useState([]);

  const { push } = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const handleChange = (
    domain: keyof IPermissions,
    action: keyof IPermissionsActionTypes,
    value: ICheckboxValue<number>,
  ) => {
    const key = `${domain}_${action}`;
    if (!changed[key]) {
      setChanged((prev) => ({
        ...prev,
        [key]: {
          permissionDomainName: PermissionsDomainsShort[domain],
          permissionFlagName: action,
          permissionFlagValue: value.value,
          value,
        },
      }));
    } else {
      setChanged((prev) => {
        const { [key]: deleted, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (values: typeof initValues, bag: any) => {
    try {
      if (values) {
        dispatch(changePermissions(changed, id));
        setChanged({});
        toast.success(`Zmieniono uprawnienia`);
      }
    } catch (errors: any) {
      toast.error("Błąd: " + errors.join(" | "));
    }
  };

  const getAllProfiles = async () => {
    try {
      const resp: any = await permissionsServices.getAllProfiles();

      const profilesArray: any = [];

      const convertedObiect = Object.values(resp);

      convertedObiect.map((single, index) => {
        return profilesArray.push({
          label: single,
          value: index,
        });
      });

      setProfiles(profilesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  useEffect(() => {
    const domainNamesArray: any = [];
    user.Permissions.forEach((Permission: Permission) => {
      if (
        domainNamesArray.filter(
          (el: any) => Permission.PermissionDomainName === el,
        ).length > 0
      ) {
        return;
      } else {
        domainNamesArray.push(Permission.PermissionDomainName);
      }
    });

    // @ts-ignore
    setDomainNames(domainNamesArray);
  }, []);

  const initValues = {
    Auth: {
      CreateUser: 1,
      EditUser: 1,
      DeleteUser: 1,
      ViewManagementList: 1,
      ViewContactList: 1,
      ChangeOwnPassword: 1,
      ManagePermissions: 1,
      ChangeRole: 1,
      ChangePassword: 1,
      RevokePermission: 1,
      GrantPermission: 1,
    },
  };

  const allNotificationsType = [
    { NotificationName: "Utworzono użytkownika", NotificationType: 1 },
    { NotificationName: "Zaktualizowano użytkownika", NotificationType: 2 },
    { NotificationName: "Usunięto użytkownika", NotificationType: 3 },
    { NotificationName: "Aktywowano użytkownika", NotificationType: 4 },
    {
      NotificationName: "Zaktualizowano zgody użytkownika",
      NotificationType: 5,
    },
    { NotificationName: "Utworzono Akademię", NotificationType: 6 },
    { NotificationName: "Zaktualizowano Akademię", NotificationType: 7 },
    { NotificationName: "Usunięto Akademię", NotificationType: 8 },
    { NotificationName: "Utworzono trenera", NotificationType: 9 },
    { NotificationName: "Zaktualizowano trenera", NotificationType: 10 },
    { NotificationName: "Usunięto trenera", NotificationType: 11 },
    { NotificationName: "Utworzono profil zawodnika", NotificationType: 12 },
    {
      NotificationName: "Zaktualizowano profil zawodnika",
      NotificationType: 13,
    },
    {
      NotificationName: "Zmieniono dostęp do profilu zawodnika",
      NotificationType: 14,
    },
    { NotificationName: "Usunięto profil zawodnika", NotificationType: 15 },
    {
      NotificationName: "Wysłano zaproszenia do profilu",
      NotificationType: 16,
    },
    {
      NotificationName: "Zaakceptowano zaproszenie do profilu",
      NotificationType: 17,
    },
    {
      NotificationName: "Odrzucono zaproszenie do profilu",
      NotificationType: 18,
    },
    {
      NotificationName: "Usunięto zaproszenie do profilu",
      NotificationType: 19,
    },
    {
      NotificationName: "Zaktualizowano kartę zawodnika",
      NotificationType: 20,
    },
    { NotificationName: "Utworzono historię zawodnika", NotificationType: 21 },
    {
      NotificationName: "Zaktualizowano historię zawodnika",
      NotificationType: 22,
    },
    { NotificationName: "Usunięto historię zawodnika", NotificationType: 23 },
    { NotificationName: "Podłączono urządzenie", NotificationType: 24 },
    { NotificationName: "Odłączono urządzenie", NotificationType: 25 },
    { NotificationName: "Zaktualizowano kartę medyczną", NotificationType: 26 },
    { NotificationName: "Utworzono zamówienie", NotificationType: 27 },
    { NotificationName: "Utworzono zwrot", NotificationType: 28 },
    {
      NotificationName: "Usunięto przeterminioną subskrypcję",
      NotificationType: 29,
    },
    {
      NotificationName: "Zawodnik zaakceptował prośbę o dołączenie do Akademii",
      NotificationType: 30,
    },
    {
      NotificationName: "Trener zaakceptował prośbę o dołączenie do Akademii",
      NotificationType: 31,
    },
    {
      NotificationName: "Akademia zaakceptowała prośbę zawodnika o dołączenie",
      NotificationType: 32,
    },
    {
      NotificationName: "Akademia zaakceptowała prośbę trenera o dołączenie",
      NotificationType: 33,
    },
    { NotificationName: "Zawodnik opuścił Akademię", NotificationType: 34 },
    { NotificationName: "Trener opuścił Akademię", NotificationType: 35 },
    { NotificationName: "Akademia zwolniła trenera", NotificationType: 36 },
    { NotificationName: "Akademia zwolniła zawodnika", NotificationType: 37 },
    {
      NotificationName: "Zawodnik zaakceptował prośbę o obserwowanie",
      NotificationType: 38,
    },
    {
      NotificationName: "Trener zaakceptował prośbę o obserwowanie",
      NotificationType: 39,
    },
    { NotificationName: "Trener cofnął obserwowanie", NotificationType: 40 },
    { NotificationName: "Zawodnik cofnął obserwowanie", NotificationType: 41 },
    { NotificationName: "Kupiono subskrypcję", NotificationType: 42 },
    {
      NotificationName: "Zaktualizowano status płatności zamówienia",
      NotificationType: 43,
    },
    {
      NotificationName: "Utworzono transakcję zamówienia",
      NotificationType: 44,
    },
    {
      NotificationName: "Aktualizacja płatności w zamówieniu",
      NotificationType: 45,
    },
    {
      NotificationName: "Użytkownik usunął zamówienie",
      NotificationType: 46,
    },
    {
      NotificationName: "Aktualizacja dostępu do relacji trenera",
      NotificationType: 47,
    },
    {
      NotificationName: "Aktualizacja dostępu do relacji akademii",
      NotificationType: 48,
    },
  ];

  return (
    <PermissionSection label={"Powiadomienia"}>
      {allNotificationsType.map((singleNotification) => {
        return (
          <>
            <NotificationSwitchBlock
              domainName={singleNotification.NotificationName}
              flagName={singleNotification.NotificationName}
              flagValue={singleNotification.NotificationType}
              name={singleNotification.NotificationName}
              // key={key}
              label={singleNotification.NotificationName}
              // onChange={(e) => handleChange("Auth", key, e.target.value)}

              checked={
                user.SubscribedNotificaitons.filter(
                  (test) =>
                    test.NotificationType ===
                    singleNotification.NotificationType,
                ).length > 0
              }
            />
          </>
        );
      })}
    </PermissionSection>
  );
};

export default EditNotifications;
