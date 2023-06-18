import * as Yup from 'yup';

import {
  ConditionSubGroupRow,
  ConditionTemplate,
  ConditionTemplateSalesChannel,
  ConditionTemplateSubgroup,
  ICondition,
} from 'types/conditionTypes';
import { validationMessage } from './validation';

export const conditionValidations = Yup.object().shape({
  name: Yup.string().required(validationMessage.isRequired),
});

const formatSubgroups = (conditionsSubgroups: ConditionTemplateSubgroup[]) =>
  conditionsSubgroups.map((subgroup) => {
    const conditionsRows: ConditionSubGroupRow[] = formatContiionRows(subgroup.conditionsRows);

    return {
      subgroupId: subgroup.subgroupDTO.id,
      defaultChildsValue: subgroup.defaultChildsValue,
      isValuePercentage: subgroup.isValuePercentage,
      conditionsRows,
    };
  });

const formatContiionRows = (conditionsRows: ConditionTemplateSalesChannel[]) =>
  conditionsRows.map((conditionRow) => {
    return {
      name: conditionRow.name,
      isValuePercentage: conditionRow.isValuePercentage,
      salesChannelId: conditionRow.salesChannel.id,
      value: conditionRow.value,
    };
  });

export const templateToRequestObject = (template: ConditionTemplate): ICondition => {
  const { name, comments, id, licensor, isActive, conditionsGroups, isTemplate } = template;
  const groups = conditionsGroups.map(({ group, defaultChildsValue, isValuePercentage, conditionsSubgroups }) => {
    const subgroups = formatSubgroups(conditionsSubgroups);
    return { group: group.flagValue, defaultChildsValue, isValuePercentage, subgroups };
  });

  return {
    name,
    comments,
    id,
    licensorId: licensor?.id || null,
    groups,
    isActive,
    isTemplate,
  };
};
