// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import categoryServices from "services/Category/categoryServices";
import { SortedCategory } from "types/Category/categoryTypes";

interface CategoryProps {
    editCategory:(categoryId: string[]) => void;
}

const Category: React.FC<CategoryProps> = ({
    editCategory
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
    const [sortedCategories, setSortedCategories] = useState<SortedCategory[] | null>([])
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<string[]>([])

    useEffect(async () => {
        const categories = await categoryServices.getAllSorted(currentUser?.storeId);
        setSortedCategories(categories);
    },[])

    if(sortedCategories?.length === 0 ) {
        return null;
    }

    return (
        <div>
          {sortedCategories && sortedCategories.map((category) => (
            <div key={category.id} className="flex">
                <input
                type="checkbox"
                className="w-10"
                id={category.id}
                checked={selectedCategoriesIds.includes(category.id)}
                onChange={() => {
                    editCategory(selectedCategoriesIds);
                    if (selectedCategoriesIds.includes(category.id)) {
                    setSelectedCategoriesIds(selectedCategoriesIds.filter((id) => id !== category.id));
                    // editCategory(selectedCategoriesIds); // usuń wartość z tablicy
                    } else {
                    setSelectedCategoriesIds([...selectedCategoriesIds, category.id]);
                    // editCategory(selectedCategoriesIds); // dodaj wartość do tablicy
                    }
                }}
                />
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))}
        </div>
      );
}

export default Category;