// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import FormSection from "components/common/forms/FormSection";
import { IProduct, IProductAttributeValue } from "types/Product/product"
import productTemplateServices from "../../../../../services/ProductTemplate/productTemplateServices"
import attributeServices from "../../../../../services/Attribute/attributeServices"
import { IListPageRequest } from "types/globalTypes";
import SelectGlobal from "components/common/inputs/select/SelectGlobal";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import styled from "styled-components";

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;

interface IProductAttributeProps {
    product: IProduct,
    activeLanguages: any;
    productAttributeList: IProductAttributeValue[];
    addProductAttribute: (productAttributeId: string, productAttributeName: string) => void;
}

const ProductAttribute: React.FC<IProductAttributeProps> = ({
    product,
    activeLanguages,
    productAttributeList,
    addProductAttribute
}) => { 
    const { currentUser } = useSelector((state: RootState) => state);
    const [currentLanguageAttribute, setCurrentLanguageAttribute] = useState("");

    const [productTemplates, setProductTemplates] = useState([]);
    const [selectedProductTemplate, setSelectedProductTemplate] = useState({});
    const [productAttributes, setProductAttributes] = useState([]);
    const [selectedProductAttributes, setSelectedProductAttributes] = useState({});
    const [editedProductAttributeIndex, setEditedProductAttributeIndex] = useState(null);

      useEffect(() => {
        console.log(selectedProductAttributes)
      },[selectedProductAttributes])

      useEffect(async () => {
        try {
            const pageRequest: IListPageRequest = {
              pageNumber: 1,
              pageSize: 50,
              searchString: "",
              storeId: currentUser?.storeId,
            }
            const resp = await productTemplateServices.getAll(pageRequest)
            //@ts-ignore
            const productTemplateArray = [];
            //@ts-ignore
            resp.items.map((single) => {
              return productTemplateArray.push({
                value: single.id,
                label: single.name,
              });
            });
      
            //@ts-ignore
            setProductTemplates(productTemplateArray);
          } catch (error) {
            console.log(error);
          }
      }, []);

      useEffect(async () => {
        try {
            const pageRequest: IListPageRequest = {
              pageNumber: 1,
              pageSize: 50,
              searchString: "",
              storeId: currentUser?.storeId,
            }
            const resp = await attributeServices.getAll(pageRequest)
            //@ts-ignore
            const productAttributeArray = [];
            //@ts-ignore
            resp.items.map((single) => {
              return productAttributeArray.push({
                value: single.id,
                label: single.name,
              });
            });
            
            //@ts-ignore
            setProductAttributes(productAttributeArray);
          } catch (error) {
            console.log(error);
          }
      }, []);

      const cols = {
        AttributeName: "Nazwa atrybutu",
        Value: "Wartość",
        Actions: "Akcje",
    };


    return (
        <div className="w-full">
            <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                <span>Wzór produktowy</span>
            </div>
            <div className="flex">
                <SelectGlobal
                name="Template"
                label={"Wzór"}
                items={productTemplates}
                selectedItem={selectedProductTemplate}
                setSelectedItem={setSelectedProductTemplate}
                ></SelectGlobal>
                <Button
                className="h-10"
                variant={ButtonVariant.Submit}>
                    Zastosuj
                </Button>
            </div>
            <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                <span>Dostępne atrybuty</span>
            </div>
            <div className="flex">
                <SelectGlobal
                name="Attribute"
                label={"Atrybut"}
                items={productAttributes}
                selectedItem={selectedProductAttributes}
                setSelectedItem={setSelectedProductAttributes}
                ></SelectGlobal>
                <Button
                className="h-10"
                variant={ButtonVariant.Submit}
                onClick={() => {
                    addProductAttribute(selectedProductAttributes.value, selectedProductAttributes.label)
                }}>
                    Dodaj atrybut
                </Button>
            </div>
            <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                <span>Atrybuty</span>
            </div>
            <div className="w-full">
                <div className="px-18 flex py-8 bg-white opacity-80 rounded-t-sm">
                    <div className="opacity-70 flex">
                        <div
                        className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                        bg-white bg-opacity-50 
                        hover:bg-opacity-90 
                        w-36 h-12 
                        rounded-b-md cursor-pointer 
                        text-sm
                        transition-opacity duration-150
                        `}
                        onClick={() => setCurrentLanguageAttribute("")}
                        >
                            <span className="capitalize-first">Domyślny</span>                    </div>
                        </div>
                        {activeLanguages.languages.map((tab) => (
                            <div key={tab.id} className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                            bg-white bg-opacity-50 
                            hover:bg-opacity-90 
                            w-36 h-12 
                            rounded-b-md cursor-pointer 
                            text-sm
                            transition-opacity duration-150
                            `}
                            onClick={() => setCurrentLanguageAttribute(tab.id)}
                            >
                                <span>{tab.nameOrginal}</span>
                            </div>
                        ))}
                </div>
                <GridColumn cols={3}>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                        <span className="opacity-70">{cols.AttributeName}</span>
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                        <span className="opacity-70">{cols.Value}</span>
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                        <span className="opacity-70">{cols.Actions}</span>
                    </div>
                </GridColumn>
                {productAttributeList?.map((singleProductAttribute: IProductAttributeValue, index) => {
                    if(index === editedProductAttributeIndex) { 
                        return (
                            <GridColumn cols={3}>

                            </GridColumn>
                        )
                    } else {
                        return (
                            <GridColumn cols={3}>
                                {console.log(singleProductAttribute)}
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <span className="opacity-70">{singleProductAttribute.attributeName}</span>
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <span className="opacity-70">{singleProductAttribute.value}</span>
                                </div>
                            </GridColumn>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ProductAttribute;

