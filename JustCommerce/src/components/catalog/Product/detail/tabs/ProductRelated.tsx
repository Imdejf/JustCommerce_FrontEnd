// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import { DefaultSortContext } from "contexts/defaultSortContext";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import { ProductDTO, IRelatedProduct } from "types/Product/product"
import productServices from "../../../../../services/Product/productServices"
import FormSection from "../../../../common/forms/FormSection";
import DataTable from "../../../../common/dataTable/DataTable";
import useInfiniteScroll from "../../../../../hooks/useInfiniteScroll";
import AssociatedStatusInfo from "components/playerProfiles/status/AssociatedStatusInfo";
import AsyncSelect from 'react-select/async';
import { IListPageRequest } from "types/globalTypes";
import { toast } from "react-toastify";

interface ProductRelatedProps {
    product: ProductDTO,
}

const ProductRelated: React.FC<ProductRelatedProps> = ({
    product
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
    const [selectedProducts, setSelectedProducts] = useState<Array<any>>([]);

    const [options, setOptions] = useState([]);
    const [queryString, setQueryString] = useState("");
    const headers = ["Nazwa produktu", "Widoczny"];

    const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
    const [sortBy, setSortBy] =
      useState<{ value: number; label: string } | null>(null);
    const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

    const customStyles = {
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          borderBottom: '1px solid #ccc',
          margin: '10px 0',
          width:'250px'
        }),
    };

    const updateRelatedProduct = async () => {
        const selectedProductIds = selectedProducts.map((product) => product.value);
        const relatedProduct: IRelatedProduct = {
            productId: product.id,
            productLinks: selectedProductIds
        }
        try {
            await productServices.editRelatedProduct(relatedProduct)
            toast.success("Zaktualizowano relacje");
        } catch {
            toast.error("Błąd akutalizacji relacji!");
        }
    }

    const {
        items: products,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<ProductListItemDTO>(
        productServices.getAll, 
        "",
        undefined,
        undefined, 
        currentUser?.storeId);

    const handleSearch = (query: string) => {
        setQueryString(query);
    };

    useEffect(() => {
        if(product !== null) {
            const transformedProducts = product.relatedProducts.map((product) => ({
                value: product.id,
                label: product.name,
                isPublished: product.isPublished
              }));
              setSelectedProducts(transformedProducts);

        }
    }, [product])

    useEffect(() => {
        if (sortBy) {
          // @ts-ignore
          setDefaultSort(sortBy.value);
        }
    }, [sortBy]);


    
    const sortingFunction = (type: number, array: any) => {
        switch (type) {
          case 0:
            return array.slice().reverse();
          case 1:
            return array;
          case 2:
            return array
              .slice()
              .sort((a: any, b: any) => compare(a, b, "Name"))
              .reverse();
          default:
            return array;
        }
    };

    const sortedArray = sortingFunction(sortBy?.value, selectedProducts);
    const rows = sortedArray?.map((product: any) => ({
        cols: [
            product.label,
            <AssociatedStatusInfo isActive={product.isPublished}/>,
        ],
    }));


    const loadOptions = async (inputValue, callback) => {
        const listPageRequest: IListPageRequest = {
          pageNumber: 1,
          pageSize: 20,
          searchString: inputValue,
          storeId: currentUser?.storeId
        };
        const response = await productServices.getAll(listPageRequest);
      
        const options = response.items.map((product) => {
          return {
            value: product.id,
            label: product.name,
            isPublished: product.isPublished
          };
        });
        
        callback(options);
      };

      const handleSelectChange = (selectedOptions) => {
        let existOption = false;
        selectedProducts.forEach((option) => {
            if(option.value === selectedOptions.value) {
                existOption = true;
            }
        })
        
        if(!existOption) {
            setSelectedProducts(selectedProducts.concat(selectedOptions));
        }
        else {
            setSelectedProducts(selectedProducts.filter(product => product.value !== selectedOptions.value));
        }
      };

    return (
        <div>
            <FormSection label="Wybierz produkty">
            <AsyncSelect
                styles={customStyles}
                // isMulti
                //cacheOptions
                loadOptions={loadOptions}
                onChange={handleSelectChange}
            />
            </FormSection>
            <FormSection label="Produkty powiązane">
            </FormSection>
            <DataTable
                rows={rows}
                headers={headers}
                isDataLoading={loading}
                containerRef={containerRef}
                lastItemRef={lastItemRef}
                />
                <Button
                // disabled={!option}
                className="h-10"
                onClick={() => {
                    updateRelatedProduct()
                }}
                variant={ButtonVariant.Submit}>
                    Zapisz
                </Button>
        </div>
    )
}

export default ProductRelated;