import { useState } from "react";
import { useTranslation } from "react-i18next";

import ContentContainer from "components/layout/ContentContainer";
import FilterPanel from "components/filters/FilterPanel";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import salesChannelsService from "services/salesChannelServices";
import { ISalesChannel } from "types/salesChannelTypes";

import SalesChannelTable from "./SalesChannelTable";
import SalesChannelsTopbar from "./SalesChannelTopbar";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "Selles",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "selles",
  },
];

const SalesChannels: React.FC = () => {
  const [queryString, setQueryString] = useState("");

  const { t } = useTranslation();

  const {
    items: salesChannels,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<ISalesChannel>(
    salesChannelsService.getAll,
    queryString
  );

  const handleQueryChange = (value: string) => {
    setQueryString(value);
  };

  return (
    <ContentContainer
      title={t("labels.salesChannels")}
      TopBar={<SalesChannelsTopbar handleQueryChange={handleQueryChange} />}
    >
      <FilterPanel filters={filters} />
      <SalesChannelTable
        salesChannels={salesChannels}
        containerRef={containerRef}
        lastItemRef={lastItemRef}
        isDataLoading={loading}
      />
    </ContentContainer>
  );
};

export default SalesChannels;
