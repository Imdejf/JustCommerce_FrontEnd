import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

import ContentContainer from "components/layout/ContentContainer";
import FilterPanel from "components/filters/FilterPanel";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import { DataViewMode } from "types/globalTypes";
import { ITrack } from "components/tracks/utils/trackTypes";
import tracksService from "services/trackServices";

import TracksList from "./tiles/TrackList";
import TrackTable from "./TrackTable";
import TrackTopbar from "./TrackTopbar";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "Track",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Track",
  },
];

const Tracks: React.FC = () => {
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.tracks
  );
  const [queryString, setQueryString] = useState("");
  const {
    items: tracks,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<ITrack>(tracksService.getAll, queryString);
  const { t } = useTranslation();

  const handleQueryChange = (value: string) => {
    setQueryString(value);
  };

  return (
    <ContentContainer
      title={t("track.list.title")}
      TopBar={<TrackTopbar handleQueryChange={handleQueryChange} />}
    >
      <FilterPanel filters={filters} />

      {viewMode === DataViewMode.table ? (
        <TrackTable
          tracks={tracks}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          isDataLoading={loading}
        />
      ) : (
        <TracksList
          tracks={tracks}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          isDataLoading={loading}
        />
      )}
    </ContentContainer>
  );
};

export default Tracks;
