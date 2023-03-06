import { ChangeEvent } from "react";
import { useHistory } from "react-router";

import Button from "../../common/buttons/basicButton/Button";
import FilterButton from "../../common/buttons/filterButton/FilterButton";
import InputSearch from "../../common/inputs/searchInput/InputSearch";
import ToggleDataViewMode from "../../common/toggleDataView/ToggleDataViewMode";

import { ButtonVariant } from "../../common/buttons/buttonTypes";
import { DataViewType } from "../../../types/globalTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";

interface ICategoryBarProps {
    handleQueryChange: (value: string) => void;
    sortBy: any;
    setSortBy: any;
    sorts: any;
    defaultSort: any;
}

const CategoryTopBar: React.FC <ICategoryBarProps> = ({
    handleQueryChange,
    sortBy,
    setSortBy,
    sorts,
    defaultSort,
}) => {
    const { push } = useHistory();
    const handleAddUser = () => {
        push("/catalog/category/add");
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
          <ToggleDataViewMode viewType={DataViewType.usersManagment} />
          <FilterButton />
          <Button
            onClick={handleAddUser}
            className="px-24 xl:order-2"
            variant={ButtonVariant.Submit}
          >
            Dodaj kategorie
          </Button>
        </div>
    )
}

export default CategoryTopBar;