import { ChangeEvent } from "react";

import FilterButton from "../common/buttons/filterButton/FilterButton";
import InputSearch from "../common/inputs/searchInput/InputSearch";
import ToggleDataViewMode from "../common/toggleDataView/ToggleDataViewMode";

import { DataViewType } from "../../types/globalTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";

interface IContactsTopbarProps {
  handleQueryChange: (value: string) => void;
  sortBy: any;
  setSortBy: any;
  sorts: any;
  defaultSort: any;
}

const ContactsTopbar: React.FC<IContactsTopbarProps> = ({
  handleQueryChange,
  sortBy,
  setSortBy,
  sorts,
  defaultSort,
}) => {
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
      <ToggleDataViewMode viewType={DataViewType.contacts} />
      {/* <FilterButton /> */}
    </div>
  );
};

export default ContactsTopbar;
