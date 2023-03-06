import { ISalesChannelSubGroup } from './salesChannelTypes';

export interface ICondition {
  id: string | null;
  comments: string;
  groups: Array<ConditionGroup>;
  isTemplate: boolean;
  isActive: boolean;
  licensorId: string | null;
  name: string;
}

export type ConditionGroup = {
  defaultChildsValue: number;
  group: number;
  isValuePercentage: boolean;
  subgroups: Array<ConditionSubGroup>;
};

export type ConditionSubGroup = {
  conditionsRows: Array<ConditionSubGroupRow>;
  defaultChildsValue: number;
  isValuePercentage: boolean;
  subgroupId: string;
};

export type ConditionSubGroupRow = {
  name: string;
  isValuePercentage: boolean;
  salesChannelId: string;
  value: number;
};

export enum ConditionStatus {
  Verified,
  Active,
}

export const conditionStatusOptions = {
  Active: { label: 'Aktywny', value: ConditionStatus.Active },
  // Hold: { label: 'Zawieszony', value: ConditionStatus.Hold },
  // Revoked: { label: 'Wycofany', value: ConditionStatus.Revoked },
  // Unverified: { label: 'Niezweryfikowany', value: ConditionStatus.Unverified },
  Verified: { label: 'Zweryfikowany', value: ConditionStatus.Verified },
};

export type ConditionTemplate = {
  id: string;
  name: string;
  isTemplate: boolean;
  isActive: boolean;
  comments: string;
  licensor: null | { id: string };
  conditionsGroups: Array<ConditionTemplateGroup>;
};

export type ConditionTemplateGroup = {
  id: string;
  group: {
    flagValue: number;
    flagName: string;
  };
  defaultChildsValue: number;
  isValuePercentage: boolean;
  conditionPackId: string;
  conditionsSubgroups: Array<ConditionTemplateSubgroup>;
};

export type ConditionTemplateSubgroup = {
  id: string;
  subgroupDTO: {
    id: string;
    name: string;
    group: number;
  };
  conditionsGroupId: string;
  conditionsRows: Array<ConditionTemplateSalesChannel>;
  defaultChildsValue: number;
  isValuePercentage: boolean;
};

export type ConditionTemplateSalesChannel = {
  id: string;
  name: string;
  isValuePercentage: boolean;
  conditionsSubgroupId: string;
  salesChannel: {
    id: string;
    name: string;
    subgroupId: string;
    isActive: boolean;
  };
  value: number;
};
