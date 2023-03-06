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

interface Props {
  user: UserInterface;
}

const EditPermissions: React.FC<Props> = ({ user }) => {
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

  return (
    <div className="flex flex-col" style={{ width: "100%" }}>
      {/* <AssignToProfileSelect
        userId={id}
        //@ts-ignore
        profiles={profiles}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      /> */}
      {/* <button onClick={() => domainNames.map((el: any) => console.log(el))}>
        xddddd
      </button> */}
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form className="flex-1">
            <fieldset
              className="flex flex-col gap-4"
              style={{ marginTop: "10px" }}
              disabled={isSubmitting}
            >
              {domainNames.length > 0 &&
                domainNames.map((domainName: string) => (
                  <PermissionSection label={translateDomainNames(domainName)}>
                    {user.Permissions.filter(
                      (permission) =>
                        permission.PermissionDomainName === domainName,
                    ).map((Permission) => (
                      <SwitchBlock
                        domainName={Permission.PermissionDomainName}
                        flagName={Permission.PermissionFlagName}
                        flagValue={Permission.PermissionFlagValue}
                        name={Permission.PermissionFlagName}
                        // key={key}
                        label={translateFlagNames(
                          Permission.PermissionFlagName,
                        )}
                        // onChange={(e) => handleChange("Auth", key, e.target.value)}
                        checked={Permission.IsAvailable}
                      />
                    ))}
                  </PermissionSection>
                ))}

              {/* <PermissionSection label="Administracja">
                {user.Permissions.map((Permission) => (
                  <SwitchBlock
                    // key={key}
                    label={Permission.PermissionFlagName}
                    name={Permission.PermissionFlagName}
                    // onChange={(e) => handleChange("Auth", key, e.target.value)}
                    checked={Permission.IsAvailable}
                  />
                ))}
              </PermissionSection> */}
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPermissions;
