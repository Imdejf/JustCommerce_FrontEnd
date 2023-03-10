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
      toast.error("B????d: " + errors.join(" | "));
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
    { NotificationName: "Utworzono u??ytkownika", NotificationType: 1 },
    { NotificationName: "Zaktualizowano u??ytkownika", NotificationType: 2 },
    { NotificationName: "Usuni??to u??ytkownika", NotificationType: 3 },
    { NotificationName: "Aktywowano u??ytkownika", NotificationType: 4 },
    {
      NotificationName: "Zaktualizowano zgody u??ytkownika",
      NotificationType: 5,
    },
    { NotificationName: "Utworzono Akademi??", NotificationType: 6 },
    { NotificationName: "Zaktualizowano Akademi??", NotificationType: 7 },
    { NotificationName: "Usuni??to Akademi??", NotificationType: 8 },
    { NotificationName: "Utworzono trenera", NotificationType: 9 },
    { NotificationName: "Zaktualizowano trenera", NotificationType: 10 },
    { NotificationName: "Usuni??to trenera", NotificationType: 11 },
    { NotificationName: "Utworzono profil zawodnika", NotificationType: 12 },
    {
      NotificationName: "Zaktualizowano profil zawodnika",
      NotificationType: 13,
    },
    {
      NotificationName: "Zmieniono dost??p do profilu zawodnika",
      NotificationType: 14,
    },
    { NotificationName: "Usuni??to profil zawodnika", NotificationType: 15 },
    {
      NotificationName: "Wys??ano zaproszenia do profilu",
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
      NotificationName: "Usuni??to zaproszenie do profilu",
      NotificationType: 19,
    },
    {
      NotificationName: "Zaktualizowano kart?? zawodnika",
      NotificationType: 20,
    },
    { NotificationName: "Utworzono histori?? zawodnika", NotificationType: 21 },
    {
      NotificationName: "Zaktualizowano histori?? zawodnika",
      NotificationType: 22,
    },
    { NotificationName: "Usuni??to histori?? zawodnika", NotificationType: 23 },
    { NotificationName: "Pod????czono urz??dzenie", NotificationType: 24 },
    { NotificationName: "Od????czono urz??dzenie", NotificationType: 25 },
    { NotificationName: "Zaktualizowano kart?? medyczn??", NotificationType: 26 },
    { NotificationName: "Utworzono zam??wienie", NotificationType: 27 },
    { NotificationName: "Utworzono zwrot", NotificationType: 28 },
    {
      NotificationName: "Usuni??to przeterminion?? subskrypcj??",
      NotificationType: 29,
    },
    {
      NotificationName: "Zawodnik zaakceptowa?? pro??b?? o do????czenie do Akademii",
      NotificationType: 30,
    },
    {
      NotificationName: "Trener zaakceptowa?? pro??b?? o do????czenie do Akademii",
      NotificationType: 31,
    },
    {
      NotificationName: "Akademia zaakceptowa??a pro??b?? zawodnika o do????czenie",
      NotificationType: 32,
    },
    {
      NotificationName: "Akademia zaakceptowa??a pro??b?? trenera o do????czenie",
      NotificationType: 33,
    },
    { NotificationName: "Zawodnik opu??ci?? Akademi??", NotificationType: 34 },
    { NotificationName: "Trener opu??ci?? Akademi??", NotificationType: 35 },
    { NotificationName: "Akademia zwolni??a trenera", NotificationType: 36 },
    { NotificationName: "Akademia zwolni??a zawodnika", NotificationType: 37 },
    {
      NotificationName: "Zawodnik zaakceptowa?? pro??b?? o obserwowanie",
      NotificationType: 38,
    },
    {
      NotificationName: "Trener zaakceptowa?? pro??b?? o obserwowanie",
      NotificationType: 39,
    },
    { NotificationName: "Trener cofn???? obserwowanie", NotificationType: 40 },
    { NotificationName: "Zawodnik cofn???? obserwowanie", NotificationType: 41 },
    { NotificationName: "Kupiono subskrypcj??", NotificationType: 42 },
    {
      NotificationName: "Zaktualizowano status p??atno??ci zam??wienia",
      NotificationType: 43,
    },
    {
      NotificationName: "Utworzono transakcj?? zam??wienia",
      NotificationType: 44,
    },
    {
      NotificationName: "Aktualizacja p??atno??ci w zam??wieniu",
      NotificationType: 45,
    },
    {
      NotificationName: "U??ytkownik usun???? zam??wienie",
      NotificationType: 46,
    },
    {
      NotificationName: "Aktualizacja dost??pu do relacji trenera",
      NotificationType: 47,
    },
    {
      NotificationName: "Aktualizacja dost??pu do relacji akademii",
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
