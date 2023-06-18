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

      {/* {groups.map((group, idx) => {
        return (
           */}
      <div key={`${"Licencja"}}`} className="shadow bg-white-dirty mb-24">
        <table className="w-full table-fixed" cellSpacing="1" cellPadding="10">
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
            groupIndex={1}
            // @ts-ignore
            subgroups={groups.Licence}
            // @ts-ignore
            groupName={"Licencja"}
          />
        </table>
      </div>

      <div key={`${"Usługa"}}`} className="shadow bg-white-dirty mb-24">
        <table className="w-full table-fixed" cellSpacing="1" cellPadding="10">
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
            groupIndex={1}
            // @ts-ignore
            subgroups={groups.Service}
            // @ts-ignore
            groupName={"Usługa"}
          />
        </table>
      </div>

      <div key={`${"Produkt"}}`} className="shadow bg-white-dirty mb-24">
        <table className="w-full table-fixed" cellSpacing="1" cellPadding="10">
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
            groupIndex={1}
            // @ts-ignore
            subgroups={groups.Product}
            // @ts-ignore
            groupName={"Produkt"}
          />
        </table>
      </div>

      {/* );
      })} */}
    </FormSection>
  );
};

export default GroupPanel;
