import FormSection from "components/common/forms/FormSection";

import { ConditionTemplateGroup } from "types/conditionTypes";

import Group from "./Group";

type Props = {
  groups: ConditionTemplateGroup[];
  isSubmitting: boolean;
};

const GroupPanel = ({ isSubmitting, groups }: Props) => {
  return (
    <FormSection isDisabled={isSubmitting} label="">
      {/* @ts-ignore */}
      {groups.map((group, idx) => {
        return (
          <div key={`${idx}}`} className="shadow bg-white-dirty mb-24">
            <table
              className="w-full table-fixed"
              cellSpacing="1"
              cellPadding="10"
            >
              <colgroup>
                <col width="30" />
                <col />
                <col width="30" />
                <col />
                <col />
                <col width="100" />
                <col />
              </colgroup>
              <Group
                groupIndex={idx}
                // @ts-ignore
                subgroups={group.Values}
                // @ts-ignore
                groupName={group.Name}
              />
            </table>
          </div>
        );
      })}
    </FormSection>
  );
};

export default GroupPanel;
