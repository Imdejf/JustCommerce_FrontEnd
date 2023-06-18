import { IPermissionProfile } from '../../types/permissionsTypes';
import { getProfilesSelectOptions } from '../permissionsUtils';

describe('getProfilesSelectOptions', () => {
  const mockProfiles: Array<IPermissionProfile> = [
    { flagName: 'test1', flagValue: 1 },
    { flagName: 'test2', flagValue: 2 },
    { flagName: 'test3', flagValue: 3 },
  ];

  const expectedProfilesOptions = [
    { label: 'test1', value: 1 },
    { label: 'test2', value: 2 },
    { label: 'test3', value: 3 },
  ];
  test('should return proper values', () => {
    const restult = getProfilesSelectOptions(mockProfiles);
    expect(restult).toStrictEqual(expectedProfilesOptions);
  });
});
