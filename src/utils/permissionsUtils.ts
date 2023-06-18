import i18next from 'i18next';

import { ISelectOption } from '../components/common/inputs/inputTypes';
import { ICheckboxValue } from '../types/globalTypes';
import {
  IPermissionDTO,
  IPermissionProfile,
  IPermissionResponse,
  IPermissions,
  IPermissionsActionTypes,
  IPermissionTransformDTO,
  PermissionChangeItemType,
  PermissionsDomains,
} from '../types/permissionsTypes';

export const PermissionsLabels: IPermissionsActionTypes = {
  Accept: i18next.t('permissions.accept'),
  ChangeOwnPassword: i18next.t('permissions.changeOwnPassword'),
  ChangePassword: i18next.t('permissions.changePassword'),
  ChangeRole: i18next.t('permissions.changeRole'),
  ChangeStatus: i18next.t('permissions.changeStatus'),
  Create: i18next.t('permissions.create'),
  CreatePresspack: i18next.t('permissions.createPresspack'),
  CreateStoredFile: i18next.t('permissions.createStoredFile'),
  CreateSubgroup: i18next.t('permissions.createSubgroup'),
  CreateUser: i18next.t('permissions.createUser'),
  Deactivate: i18next.t('permissions.deactivate'),
  Delete: i18next.t('permissions.delete'),
  DeletePresspack: i18next.t('permissions.deletePresspack'),
  DeleteStoredFile: i18next.t('permissions.deleteStoredFile'),
  DeleteSubgroup: i18next.t('permissions.deleteSubgroup'),
  DeleteUser: i18next.t('permissions.deleteUser'),
  Detail: i18next.t('permissions.detail'),
  Details: i18next.t('permissions.details'),
  DetailSubgroup: i18next.t('permissions.detailSubgroup'),
  DowngradeStatus: i18next.t('permissions.downgradeStatus'),
  Edit: i18next.t('permissions.edit'),
  EditEAN: i18next.t('permissions.editEan'),
  EditFinancialData: i18next.t('permissions.editFinancialData'),
  EditLabel: i18next.t('permissions.editLabel'),
  EditName: i18next.t('permissions.editName'),
  EditPublished: i18next.t('permissions.editPublished'),
  EditUser: i18next.t('permissions.editUser'),
  GrantPermission: i18next.t('permissions.grantPermission'),
  ListGroups: i18next.t('permissions.listGroups'),
  ListSubgroups: i18next.t('permissions.listSubgroups'),
  ManagePermissions: i18next.t('permissions.managePermissions'),
  Merge: i18next.t('permissions.merge'),
  RevokePermission: i18next.t('permissions.revokePermission'),
  SetUserActiveOrDeactive: i18next.t('permissions.setUserActiveOrDeactive'),
  Update: i18next.t('permissions.update'),
  UpdatePresspack: i18next.t('permissions.updatePresspack'),
  UpdateSubgroup: i18next.t('permissions.updateSubgroup'),
  View: i18next.t('permissions.view'),
  ViewContactList: i18next.t('permissions.viewContactList'),
  ViewList: i18next.t('permissions.viewList'),
  ViewManagementList: i18next.t('permissions.viewManagementList'),
};

const getGroupNamePermission = (permission: IPermissionResponse): keyof IPermissions =>
  PermissionsDomains[permission.item1.permissionDomainName];

export const permissoinsFromDTO = (permissions: Array<IPermissionResponse>) =>
  permissions.reduce((acc, cur) => {
    const permissionGroup = getGroupNamePermission(cur);
    const { item1: meta, item2: checked } = cur;

    if (!permissionGroup) {
      return acc;
    }

    const permisionValue = {
      [meta.permissionFlagName]: { checked, value: meta.permissionFlagValue },
    };

    const oldValue = acc[permissionGroup] || {};

    return {
      ...acc,
      [permissionGroup]: { ...oldValue, ...permisionValue },
    };
  }, {} as IPermissions<ICheckboxValue<number>>);

export const getChangedPermissionsRequestObject = (changedPermissions: IPermissionTransformDTO) =>
  Object.values(changedPermissions).reduce(
    (acc, cur) => {
      const { value, ...dataToSend } = cur;
      if (value.checked) {
        return { ...acc, permissionsToGrant: [...acc.permissionsToGrant, dataToSend] };
      }
      return { ...acc, permissionsToRevoke: [...acc.permissionsToRevoke, dataToSend] };
    },
    {
      permissionsToGrant: [],
      permissionsToRevoke: [],
    } as { permissionsToGrant: Array<IPermissionDTO>; permissionsToRevoke: Array<IPermissionDTO> }
  );

const getChangedPermissionsArray = (changedPermissions: IPermissionTransformDTO): Array<PermissionChangeItemType> =>
  Object.keys(changedPermissions).map((key) => {
    const [domain, action] = key.toString().split('_');
    const { value } = changedPermissions[key];
    return { domain, action, value } as PermissionChangeItemType;
  });

export const changedPermissionsToState = (
  userPermissions: IPermissions,
  changedPermissions: IPermissionTransformDTO
) => {
  const changes = getChangedPermissionsArray(changedPermissions);

  const newUserPermissionsState = changes.reduce((acc, change) => {
    const { domain, action, value } = change;
    return { ...acc, [domain]: { ...acc[domain], [action]: value } };
  }, userPermissions);

  return newUserPermissionsState;
};

export const getProfilesSelectOptions = (profiles: Array<IPermissionProfile>): Array<ISelectOption<number>> =>
  profiles.map((profile) => ({ label: profile.flagName, value: profile.flagValue }));
