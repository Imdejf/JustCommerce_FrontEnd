import { ChangeEvent } from "react";
import { useHistory } from "react-router";

import Button from "../../../../common/buttons/basicButton/Button";
import FilterButton from "../../../../common/buttons/filterButton/FilterButton";
import InputSearch from "../../../../common/inputs/searchInput/InputSearch";
import ToggleDataViewMode from "../../../../common/toggleDataView/ToggleDataViewMode";

import { ButtonVariant } from "../../../../common/buttons/buttonTypes";
import { DataViewType } from "../../../../../types/globalTypes";

interface IBlogItemBarProps {
    handleQueryChange: (value: string) => void;
    sortBy: any;
    setSortBy: any;
    sorts: any;
    defaultSort: any;
}

const BlogCategoryDetailTableTopBar: React.FC <IBlogItemBarProps> = ({
    handleQueryChange,
    sortBy,
    setSortBy,
    sorts,
    defaultSort,
}) => {
    const { push } = useHistory();
    const handleAddBlog = () => {
        push("/site/blog/detail/add");
    };
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        handleQueryChange(e.target.value);
    };
    
    return (
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 ">
          <InputSearch
            className="w-full md:w-36 xl:w-72"
            placeholder="Szukaj..."
            name="search"
            onChange={handleSearch}
          />
          <ToggleDataViewMode viewType={DataViewType.usersManagment} />
          <FilterButton />
          <Button
            onClick={handleAddBlog}
            className="px-24 xl:order-2"
            variant={ButtonVariant.Submit}
          >
            Dodaj blog
          </Button>
        </div>
    )
}

export default BlogCategoryDetailTableTopBar;