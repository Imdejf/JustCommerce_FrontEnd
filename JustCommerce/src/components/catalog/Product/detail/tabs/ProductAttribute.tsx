// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import FormSection from "components/common/forms/FormSection";
import { IProduct, IProductAttributeValue, IProductAttributeValueLang } from "types/Product/product"
import productTemplateServices from "../../../../../services/ProductTemplate/productTemplateServices"
import attributeServices from "../../../../../services/Attribute/attributeServices"
import { IListPageRequest } from "types/globalTypes";
import SelectGlobal from "components/common/inputs/select/SelectGlobal";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import styled from "styled-components";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";

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
   
}

const ProductAttribute: React.FC<IProductAttributeProps> = ({ 
    product,
    activeLanguages
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
    const [currentLanguageAttribute, setCurrentLanguageAttribute] = useState("");
    const [view, setView] = useState(null)

    const [attributeList, setAttributeList] = useState<Array<IProductAttributeValue>>([]);

    const [productTemplates, setProductTemplates] = useState([]);
    const [selectedProductTemplate, setSelectedProductTemplate] = useState({});
    const [productAttributes, setProductAttributes] = useState([]);
    const [selectedProductAttributes, setSelectedProductAttributes] = useState({});
    const [editedProductAttributeIndex, setEditedProductAttributeIndex] = useState(null);
    const [currentProductAttribute, setCurrentProductAttribute] = useState<IProductAttributeValue | null>(null)

    const [editedProdcutAttributeName, setEditedProductAttributeName] = useState("");
    const [editedProdcutAttributeValue, setEditedProductAttributeValue] = useState("");
    const [editedProdcutAttributeValueLang, setProdcutAttributeValueLang] = useState<Array<IProductAttributeValueLang> | null>(null);

    // const saveProductAttribute = 

    const editProductAttribute = (productAttributeId: string, productAttributeValue: string, productAttributeLangs: IProductAttributeValueLang[]) => {
        attributeList.map((attribute) => {
            if(attribute.attributeId === productAttributeId) {
                attribute.value = productAttributeValue;
                attribute.productAttributeValueLangs = productAttributeLangs;
            }
        })

        setAttributeList(attributeList);        
    };

    const handleEditedProductAttributeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProductAttributeValue(e.target.value);
    };

    const addProductAttribute = (productAttributeId: string, productAttributeName: string) => {
        const newProductAttribute: IProductAttributeValue = {
            attributeId: productAttributeId,
            attributeName: productAttributeName,
            value: "",
            productAttributeValueLangs: activeLanguages.languages.map((lang) => ({
                languageId: lang.id,
                value: "",
            }))
        }
        setAttributeList(prevList => [...prevList, newProductAttribute]);
    }

useEffect(() => {
    if(editedProductAttributeIndex !== null && editedProductAttributeIndex !== undefined) {
        const filteredItem: IProductAttributeValue = attributeList[editedProductAttributeIndex]
        const { attributeName, value, productAttributeValueLangs } = filteredItem
        setCurrentProductAttribute(filteredItem)
        setEditedProductAttributeName(attributeName)
        setEditedProductAttributeValue(value);
        setProdcutAttributeValueLang(productAttributeValueLangs);
    }
}, [editedProductAttributeIndex])

useEffect(() => {
    if(editedProductAttributeIndex !== null && editedProductAttributeIndex !== undefined && currentProductAttribute) {
        const viewToRender = (
            <div className="contents">
              {editedProdcutAttributeValueLang && editedProdcutAttributeValueLang.map((attributeValueLang, index) => {
                    if (currentLanguageAttribute === attributeValueLang.languageId) {
                        return (
                            <div key={index} className="contents">
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <span className="opacity-70">{editedProdcutAttributeName}</span>
                                </div>
                                <input
                                        value={attributeValueLang.seoFileName}
                                        onChange={async (event) => {
                                            event.persist();
                                            const editedPoductAttributeLangCopy = [...editedProdcutAttributeValueLang];
                                            editedPoductAttributeLangCopy[index] = {
                                                // ...editedProdcutAttributeValueLang,
                                                languageId: editedPoductAttributeLangCopy[index].languageId,
                                                value: event.target.value
                                            };
                                            await setProdcutAttributeValueLang(editedPoductAttributeLangCopy);
                                        }}
                                    />
                            </div>
                        )
                    }
                }
              )}
            </div>
        )
        setView(viewToRender)
    }
},[currentLanguageAttribute])

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
            {attributeList?.map((singleProductAttribute: IProductAttributeValue, index) => {
                if(index === editedProductAttributeIndex) {  
                    return (
                        <GridColumn cols={3}>
                            <div className={`${currentLanguageAttribute === "" ? "contents":"hidden"}`}>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <span className="opacity-70">{singleProductAttribute.attributeName}</span>
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="text"
                                        value={editedProdcutAttributeValue}
                                        onChange={handleEditedProductAttributeValueChange}
                                    />
                                </div>
                            </div>
                            {view}
                            {editedProductAttributeIndex !== null && (
                                <div
                                className="bg-white bg-opacity-30 p-12 text-center "
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "25px",
                                }}
                            >
                                <img
                                src={SaveIco}
                                onClick={() => {
                                    editProductAttribute(
                                        currentProductAttribute.attributeId,
                                        editedProdcutAttributeValue,
                                        editedProdcutAttributeValueLang
                                    )
                                    setCurrentProductAttribute(null) 
                                    setEditedProductAttributeIndex(null);
                                }}
                                alt="save"
                                style={{
                                    width: "18px",
                                    height: "18px",

                                    cursor: "pointer",
                                }}
                                />
                                <img
                                src={CancelIco}
                                onClick={() =>  { 
                                    setEditedProductAttributeIndex(null)
                                    setCurrentProductAttribute(null) 
                                }}
                                alt="cancel"
                                style={{
                                    width: "18px",
                                    height: "18px",

                                    cursor: "pointer",
                                }}
                                />
                            </div>
                            )}
                        </GridColumn>
                    )
                } else {
                    return (
                        <GridColumn cols={3}>
                        <div className={`${currentLanguageAttribute === "" ? "contents":"hidden"}`}>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                <span className="opacity-70">{singleProductAttribute.attributeName}</span>
                            </div>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                <span className="opacity-70">{singleProductAttribute.value}</span>
                            </div>
                        </div>
                        <div className="contents">
                            {singleProductAttribute.productAttributeValueLangs.map((lang) => {
                                if(lang.languageId === currentLanguageAttribute) {
                                    return (
                                    <div className="contents">
                                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                                <span className="opacity-70">{singleProductAttribute.attributeName}</span>
                                            </div>
                                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                                <span className="opacity-70">{lang.value}</span>
                                            </div>
                                    </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="bg-white m-auto bg-opacity-30 p-12 text-center">
                            <img
                                src={EditIco}
                                onClick={() => {
                                    setEditedProductAttributeIndex(index)
                                }}
                                alt="edit"
                                style={{
                                width: "18px",
                                height: "18px",

                                cursor: "pointer",
                                }}
                                />
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