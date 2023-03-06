import { useSelector } from "react-redux";

import { getProfilesSelectOptions } from "../utils/permissionsUtils";
import { IPermissionProfile } from "../types/permissionsTypes";
import { ISelectOption } from "../components/common/inputs/inputTypes";
import { RootState } from "../store/store";

interface ReturnValue {
  profiles: Array<IPermissionProfile>;
  selectOptions: Array<ISelectOption<number>>;
}

export const useProfiles = (): ReturnValue => {
  const profiles = useSelector((state: RootState) => state.profiles);
  if (!profiles || profiles.length === 0) {
    return { profiles: [], selectOptions: [{ label: "Admin", value: 0 }] };
  }
  const selectOptions = getProfilesSelectOptions(profiles);

  return { profiles, selectOptions };
};
