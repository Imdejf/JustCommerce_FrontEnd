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
import { ProductDTO, ProductCategoryDTO } from "types/Product/product"
import productServices from "../../../../../services/Product/productServices"

interface CategoryProps {
    product: ProductDTO,
}

const Category: React.FC<CategoryProps> = ({
    product
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
    const [sortedCategories, setSortedCategories] = useState<SortedCategory[] | null>([])
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<string[]>([])

    const editCategory = (categoryIds: string[]) => {
        setSelectedCategoriesIds(prevSelectedCategoriesIds => {
            // Usuń elementy z categoryIds, które są obecne w selectedCategoriesIds
            const updatedSelectedCategoriesIds = prevSelectedCategoriesIds.filter(
                categoryId => !categoryIds.includes(categoryId)
            );
    
            // Dodaj elementy z categoryIds, które nie istnieją jeszcze w selectedCategoriesIds
            categoryIds.forEach(categoryId => {
                if (!updatedSelectedCategoriesIds.includes(categoryId)) {
                    updatedSelectedCategoriesIds.push(categoryId);
                }
            });
            return updatedSelectedCategoriesIds;
        });
    }
    
    const saveCategories = async () => {

        const productCategoryDTO:ProductCategoryDTO = {
            productId: product.id,
            categoryIds: selectedCategoriesIds
        }
        alert()
        await productServices.editCategories(productCategoryDTO)
    }

    useEffect(async () => {
        if(sortedCategories?.length == 0) {
            const categories = await categoryServices.getAllSorted(currentUser?.storeId);
            setSortedCategories(categories);
        }
    },[sortedCategories])

    useEffect(() => {
        if(product != null){
            setSelectedCategoriesIds(product.categoryIds)
        }
    }, [product])

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
            <div className="mt-10">
                <Button
                className="h-10"
                variant={ButtonVariant.Submit}
                onClick={() => {
                    saveCategories()
                }}>
                    Zapisz kategorie
                </Button>   
            </div>    
         </div>
      );
}

export default Category;
