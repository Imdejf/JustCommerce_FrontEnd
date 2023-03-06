import { ChangeEvent } from "react";
import { useHistory } from "react-router";

import Button from "components/common/buttons/basicButton/Button";
import FilterButton from "components/common/buttons/filterButton/FilterButton";
import InputSearch from "components/common/inputs/searchInput/InputSearch";
import ToggleDataViewMode from "components/common/toggleDataView/ToggleDataViewMode";

import { ButtonVariant } from "components/common/buttons/buttonTypes";
import { DataViewType } from "types/globalTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";

interface IDigitalReleasesTopbarProps {
  handleQueryChange: (value: string) => void;
  sortBy: any;
  setSortBy: any;
  sorts: any;
  defaultSort: any;
}

const DigitalReleasesTopbar: React.FC<IDigitalReleasesTopbarProps> = ({
  handleQueryChange,
  sortBy,
  setSortBy,
  sorts,
  defaultSort,
}) => {
  const { push } = useHistory();

  const handleAddDigitalRelease = () => {
    push("/shop/products/add");
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
      <ToggleDataViewMode viewType={DataViewType.digitalRelease} />
      <FilterButton />
      <Button
        onClick={handleAddDigitalRelease}
        className="px-24 xl:order-2"
        variant={ButtonVariant.Submit}
      >
        Dodaj produkt
      </Button>
    </div>
  );
};

export default DigitalReleasesTopbar;
