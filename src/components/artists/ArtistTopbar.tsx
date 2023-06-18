import { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import Button from "../common/buttons/basicButton/Button";
import FilterButton from "../common/buttons/filterButton/FilterButton";
import InputSearch from "../common/inputs/searchInput/InputSearch";
import ToggleDataViewMode from "../common/toggleDataView/ToggleDataViewMode";

import { DataViewType } from "../../types/globalTypes";
import { ButtonVariant } from "../common/buttons/buttonTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";

interface IArtistTopbarProps {
  handleQueryChange: (value: string) => void;
  sortBy: any;
  setSortBy: any;
  sorts: any;
  defaultSort: any;
}

const ArtistTopbar: React.FC<IArtistTopbarProps> = ({
  handleQueryChange,
  sortBy,
  setSortBy,
  sorts,
  defaultSort,
}) => {
  const { push } = useHistory();

  const handleAddArtist = () => {
    push("/accounts/add");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 ">
      <SelectStatystics
        name="Sort"
        items={sorts}
        label="Sortowanie"
        selectedItem={sortBy}
        setSelectedItem={setSortBy}
        defaultValue={defaultSort}
      />
      <InputSearch
        className="w-full md:w-36 xl:w-72"
        placeholder="Szukaj..."
        name="search"
        onChange={handleSearch}
      />
      <ToggleDataViewMode viewType={DataViewType.artists} />
      <FilterButton />
      <Button
        onClick={handleAddArtist}
        className="px-24 xl:order-2"
        variant={ButtonVariant.Submit}
      >
        Dodaj
      </Button>
    </div>
  );
};

export default ArtistTopbar;
