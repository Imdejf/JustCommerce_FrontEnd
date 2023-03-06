import { useCallback, useEffect, useState } from "react";

import ContentContainer from "components/layout/ContentContainer";
import FilterPanel from "components/filters/FilterPanel";
import ConditionTable from "./ConditionsTable";
import ConditionsTopbar from "./ConditionsTopbar";

import { ICondition } from "types/conditionTypes";
import conditionsService from "services/conditionsServices";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "Conditions",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Conditions",
  },
];

const Conditions: React.FC = () => {
  const [conditions, setConditions] = useState<Array<ICondition>>([]);

  const fetchConditions = useCallback(async () => {
    const res = await conditionsService.getAll();
    setConditions(res);
  }, []);

  useEffect(() => {
    fetchConditions();
  }, [fetchConditions]);

  return (
    <ContentContainer title="Szablon warunków" TopBar={<ConditionsTopbar />}>
      <FilterPanel filters={filters} />
      <ConditionTable conditions={conditions} isDataLoading={!conditions} />
    </ContentContainer>
  );
};

export default Conditions;
