// @ts-nocheck
import { useState, useEffect, useRef, useCallback  } from "react";
import { IProduct, IProductVariation, IProductOptionCombination, IMedia } from "types/Product/product";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import SelectOptions from "components/common/inputs/select/SelectOption";

import styled from "styled-components";
import { IProductOption } from "types/Product/product"
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;


interface IProductVariantosProps {
    product: IProduct;
    activeLanguages: any;
    options: IProductOption[],
    tags: [],
    addedProductVariationList: IProductVariation[],
    editProductVariation: boolean;
    addProductVariation:(productVariation: IProductVariation) => void;
    toggleEditProductVariation: React.Dispatch<React.SetStateAction<boolean>>;
    newEditedProductVariation: (
        name: string,
        normalizedName: string,
        sku: string,
        gtin: string,
        price: number,
        oldPrice?: number,
        thumbnailImage: IMedia,
        newImages: IMedia[],
        optionCombinations: IProductOptionCombination[],
    ) => void,
    addThumbnailsVariation: (index: number) => void
}


const cols = {
    OptionCombination: "Kombinacja",
    Sku: "SKU",
    Gtin: "GTIN",
    Price: "Price",
    OldPrice: "OldPrice",
    Thumbnails: "Thumbnails",
    Images: "Images",
    Actions: "Akcje"
};

const ProductVariantos: React.FC<IProductVariantosProps> = ({
    product: product,
    activeLanguages,
    options,
    tags,
    addedProductVariationList,
    editProductVariation,
    addProductVariation,
    toggleEditProductVariation,
    newEditedProductVariation,
    addThumbnailsVariation
}) => {
    const [currentLanguagePhoto, setCurrentLanguagePhoto] = useState("");
    const [type, setType] =
    useState<{ value: number; label: string } | null>(null);
    
    const [toggleShowNewCombination, setToggleShowNewCombination] = useState(false)
    const [editedProductVariation, setEditedProductVariation] = useState(null);
    const [selectedOptionCombination, setSelectedOptionCombination] = useState<IProductOptionCombination[]>([]);

    const [option, setOption] =
    useState<{ value: number; label: string } | null>(null);
    
    const [newProductVariation, setNewProductVariation] = useState<IProductVariation | null>(null);

    const [editedSku, setEditedSku] = useState("");
    const [editedGtin, setEditedGtin] = useState("");
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedOldPrice, setEditedOldPrice] = useState(0);
    
    const handleOptionChangeTest = (event: React.ChangeEvent<HTMLSelectElement>, optionId: string, optionName: string, index: number) => {
        const { value } = event.target;
        setSelectedValues((prevSelectedValues) => ({
          ...prevSelectedValues,
          [optionId]: value,
        }));
    
        // znajdź i usuń poprzedni obiekt
        const prevOptionCombinationIndex = selectedOptionCombination.findIndex((optionCombination) => optionCombination.optionId === optionId);
        if (prevOptionCombinationIndex !== -1) {
            setSelectedOptionCombination((prevSelectedOptionCombination) => {
                const newSelectedOptionCombination = [...prevSelectedOptionCombination];
                newSelectedOptionCombination.splice(prevOptionCombinationIndex, 1);
                return newSelectedOptionCombination;
            });
        }
    
        // dodaj nową kombinację opcji do stanu selectedOptionCombination
        const newOptionCombination = {
          optionId: optionId,
          value: value,
          sortIndex: index,
          productOptionCombinationLangs: [],
        };
    
        setSelectedOptionCombination((prevSelectedOptionCombination) => [
          ...prevSelectedOptionCombination,
          newOptionCombination,
        ]);
    };


    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>, optionId: string) => {
        const value = event.target.value;
        if (newProductVariation && options) {
          const option = options.find((option) => option.optionId === optionId);
          if (option) {
            const combinationIndex = newProductVariation.optionCombinations.findIndex(
              (combination) => combination.optionId === optionId
            );
      
            if (value === "") {
              if (combinationIndex >= 0) {
                newProductVariation.optionCombinations.splice(combinationIndex, 1);
              }
            } else {
              const combination = {
                optionId: optionId,
                value: value,
                sortIndex: options.findIndex((option) => option.optionId === optionId),
              };
              if (combinationIndex >= 0) {
                newProductVariation.optionCombinations[combinationIndex] = combination;
              } else {
                newProductVariation.optionCombinations.push(combination);
              }
            }
            setNewProductVariation({ ...newProductVariation });
          }
        }
    };

    const addNewVariation = () => {
        const variation: IProductVariation = {
            name: '',
            normalizedName: '',
            sku: '',
            gtin: '',
            price: 0,
            oldPrice: 0,
            // thumbnailImage: IMedia;
            // newImages: IMedia[];
            optionCombinations: []
        }

        setNewProductVariation(variation)
    }
      
      

    const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedVariations = { ...newProductVariation, sku: event.target.value };
        setNewProductVariation(updatedVariations);
    };

    const handleGtinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedVariations = { ...newProductVariation, gtin: event.target.value };
        setNewProductVariation(updatedVariations);
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedVariations = { ...newProductVariation, price: event.target.value };
      setNewProductVariation(updatedVariations);
    };

    const handleOldPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedVariations = { ...newProductVariation, oldPrice: event.target.value };
      setNewProductVariation(updatedVariations);
    };

    const handleEditedSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedSku(e.target.value);
    };

    const handleEditedGtinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedGtin(e.target.value);
    };

    const handleEditedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPrice(e.target.value);
    };

    const handleEditedOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedOldPrice(e.target.value);
    };

    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        console.log(addedProductVariationList)
    }, [addedProductVariationList])

    useEffect(() => {
        if(editedProductVariation !== null && editedProductVariation !== undefined) {
            const filteredItem: IProductVariation = addedProductVariationList[editedProductVariation];
            const { sku, gtin, price, oldPrice, optionCombinations } = filteredItem;

            setEditedSku(sku);
            setEditedGtin(gtin);
            setEditedPrice(price);
            setEditedOldPrice(oldPrice);
            setSelectedOptionCombination(optionCombinations)
        }
    }, [editedProductVariation])

    useEffect(() => {
        if(options) {
            console.log(options)
        }
    },[options])

    if(options.length === 0) {
        return null
    }

    return (
        <div className="w-full text-sm">
            <div className="px-18 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
                <div className="opacity-70 flex" >
                    <div
                    className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                    bg-white bg-opacity-50 
                    hover:bg-opacity-90 
                    w-36 h-12 
                    rounded-b-md cursor-pointer 
                    text-sm
                    transition-opacity duration-150
                    
                    `}
                    onClick={() => setCurrentLanguagePhoto("")}
                    >
                         <span className="capitalize-first">Domyślny</span>
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
                        onClick={() => setCurrentLanguagePhoto(tab.id)}
                        >
                            <span>{tab.nameOrginal}</span>
                        </div>
                        ))}
                </div>
                <div style={{ display: "flex", gap: "25px" }}>
                    <a>{editProductVariation.toString()}</a>
            {toggleShowNewCombination ? (
            <Button
            onClick={() => {
                addProductVariation(newProductVariation)
                setToggleShowNewCombination((prev) => !prev);
                toggleEditProductVariation(false)
                
            }}
            // disabled={!permissions.Edit}
            variant={ButtonVariant.Submit}
            >
            Dodaj
            </Button>
            ) : (
                <Button
                onClick={() => {
                    addNewVariation()
                    setToggleShowNewCombination(true)
                }}
                // disabled={!permissions.Edit}
                variant={ButtonVariant.Submit}
                >
                Nowy wariant
                </Button>
            )}

            {toggleShowNewCombination ? (
            <Button
            onClick={() => {
            }}
            // disabled={!permissions.Edit}
            variant={ButtonVariant.Remove}
            >
            Anuluj
            </Button>
            ) : (
                <Button
                onClick={() => {
                    toggleEditProductVariation((prev) => !prev);
                    setToggleShowNewCombination(false);
                    setEditedProductVariation(null);
                }}
                // disabled={!permissions.Edit}
                variant={ButtonVariant.Submit}
            >
                {editProductVariation ? "Cofnij" : "Edytuj"}
            </Button>
            )}
            </div>
            </div>
            {toggleShowNewCombination && (
                <>
                    <GridColumn cols={8}>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.OptionCombination}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Sku}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Gtin}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Price}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.OldPrice}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Thumbnails}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Images}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Actions}</span>
                        </div>
                    </GridColumn>
                </>
            )}
            {toggleShowNewCombination && (
                <>
                    <GridColumn cols={8} className="align-center">
                        <div className="bg-white inline-flex bg-opacity-80 p-12 text-center">
                        <div>
                            {options.map((option) => (
                                <select
                                key={option.optionId}
                                name={option.optionName}
                                value={newProductVariation?.optionCombinations?.find(combination => combination.optionId === option.optionId)?.value || ""}
                                onChange={(event) => handleOptionChange(event, option.optionId)}
                                >
                                <option value="">Select an option</option>
                                {option.values.map((value) => (
                                    <option key={value.key} value={value.key}>{value.key}</option>
                                ))}
                                </select>
                            ))}
                        </div>
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                value={newProductVariation?.sku}
                                onChange={handleSkuChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                value={newProductVariation?.gtin}
                                onChange={handleGtinChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="number"
                                step="0.01"
                                value={newProductVariation?.price}
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="number"
                                step="0.01"
                                value={newProductVariation?.oldPrice}
                                onChange={handleOldPriceChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                        </div>
                        <div
                            className="bg-white bg-opacity-30 p-12 text-center "
                            style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "25px",
                            }}
                        >                            
                        <span
                                onClick={() => {

                                }}
                                className={`  text-xl  leading-none  text-green cursor-pointer`}
                            >
                                +
                            </span>
                            <img
                            src={CancelIco}
                            onClick={() => {
                                setNewProductVariation(null)
                                setToggleShowNewCombination(false)
                            }}
                            alt="cancel"
                            style={{
                                width: "18px",
                                height: "18px",

                                cursor: "pointer",
                            }}
                            />
                        </div>
                    </GridColumn>
                </>
            )}
            <div className="max-h-96 overflow-y-auto">
                {!toggleShowNewCombination && ( 
                    <>
                        <GridColumn cols={8}>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.OptionCombination}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Sku}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Gtin}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Price}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.OldPrice}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Thumbnails}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Images}</span>
                        </div>
                        <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{cols.Actions}</span>
                        </div>
                        </GridColumn>
                    </>
                )}
            </div>
             {addedProductVariationList.map((singleProductVariation: any, index) => {
                if(index === editedProductVariation) {
                    return (
                        <GridColumn cols={8}>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    {addedProductVariationList.map((singleProductVariation: any, index) => {
                                    if (index === editedProductVariation) {
                                        const selectElements = singleProductVariation.optionCombinations.map((optionCombination) => {
                                            const option = options.find((o) => o.optionId === optionCombination.optionId);
                                        return (
                                            <div key={option.optionId}>
                                            <select id={option.optionId} name={option.optionId} value={selectedValues[option.optionId] || ''} onChange={(event) => handleOptionChangeTest(event, option.optionId, option.optionName, index)}>
                                                {option.values.map((value) => (
                                                <option key={value.key} value={value.key}>
                                                    {value.key}
                                                </option>
                                                ))}
                                            </select>
                                            </div>
                                        );
                                    });

                                    const missingOptionIds = options.filter((option) => !singleProductVariation.optionCombinations.some((optionCombination: any) => optionCombination.optionId === option.optionId)).map((option) => option.optionId);
                                    const missingSelectElements = missingOptionIds.map((missingOptionId) => {
                                    const missingOption = options.find((option) => option.optionId === missingOptionId);
                                        return (
                                        <div key={missingOptionId}>
                                            <select id={missingOptionId} name={missingOptionId} value={selectedValues[missingOptionId]} onChange={(event) => handleOptionChangeTest(event, missingOptionId, missingOption?.optionName, index)}>
                                            <option value="">Select</option>
                                            {missingOption?.values.map((value) => (
                                                <option key={value.key} value={value.key}>
                                                    {value.key}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                        );
                                    });

                                    return (
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                        {selectElements}
                                        {missingSelectElements}
                                        </div>
                                    );
                                    }
                                })}
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">

                                    <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="text"
                                        value={editedSku}
                                        onChange={handleEditedSkuChange}
                                    />
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="text"
                                        value={editedGtin}
                                        onChange={handleEditedGtinChange}
                                    />                           
                                </div>

                                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                                <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="number"
                                        step="0.01"
                                        value={editedPrice}
                                        onChange={handleEditedPriceChange}
                                    />                               
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                                <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="number"
                                        step="0.01"
                                        value={editedOldPrice}
                                        onChange={handleEditedOldPriceChange}
                                    />                              
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                             
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                             
                                </div>
                                {editProductVariation && (
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
                                            newEditedProductVariation(
                                                index,
                                                "",
                                                "",
                                                editedSku,
                                                editedGtin,
                                                editedPrice,
                                                editedOldPrice,
                                                null,
                                                null,
                                                selectedOptionCombination
                                            )
                                            setEditedProductVariation(null);
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
                                            setEditedProductVariation(null)
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
                        <GridColumn cols={8}>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                {singleProductVariation.optionCombinations.map((option) => {
                                    return (
                                        <span className="opacity-70 block">{option.value}</span>
                                    )
                                })}
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <span className="opacity-70">{singleProductVariation.sku}</span>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <span className="opacity-70">{singleProductVariation.gtin}</span>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <span className="opacity-70">{singleProductVariation.price}</span>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <span className="opacity-70">{singleProductVariation.oldPrice}</span>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}
                                onClick={() => {
                                    addThumbnailsVariation(index)
                                }}>
                                    Dodaj
                                </Button>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}>
                                    Dodaj
                                </Button>
                            </div>
                            {editProductVariation ? (
                            <div
                                className="bg-white bg-opacity-30 p-12 text-center "
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "25px",
                                }}
                            >
                                <>
                                <img
                                    src={EditIco}
                                    onClick={() => {
                                        setEditedProductVariation(index)
                                    }}
                                    alt="edit"
                                    style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                    }}
                                />
                                <span
                                    onClick={() => 
                                        setEditedProductVariation(null) 
                                    }                                                
                                    className={` text-red cursor-pointer`}
                                    style={{ fontSize: "18px" }}
                                >
                                    X
                                </span>
                                </>
                            </div>
                            ) : (
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                <span className="opacity-70"></span>
                            </div>
                            )}
                        </GridColumn>
                    )
                }
            })}
            {/* {options.length > 0 && (
                <>
                    <GridColumn cols={8}>
                    <div>
                    {options.map((option, optionIndex) => (
                            <select
                            name={option.optionName}
                            onChange={async (event) => {
                                const value = event.target.value;
                                const combinationIndex = newProductVariation.optionCombinations.findIndex(combination => combination.optionId === option.optionId);
                                if (value === "") {
                                    if (combinationIndex >= 0) {
                                        newProductVariation.optionCombinations.splice(combinationIndex, 1);
                                    }
                                } else {
                                    const combination = {
                                        optionId: option.optionId,
                                        value: value,
                                        sortIndex: optionIndex
                                    };
                                    if (combinationIndex >= 0) {
                                        newProductVariation.optionCombinations[combinationIndex] = combination;
                                    } else {
                                        newProductVariation.optionCombinations.push(combination);
                                    }
                                }
                                await setNewProductVariation({ ...newProductVariation });
                                setNewProductVariation();
                            }}
                            >
                            <option value="">Select an option</option>
                            {option.values.map((value) => (
                            <option key={value.key} value={value.key}>{value.key}</option>
                            ))}
                        </select>
                    ))}
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                        style={{ background: "rgba(0,0,0,0.04)" }}
                        type="text"
                        value={newProductVariation?.sku || ""}
                        onChange={(event) =>
                        setNewProductVariation((prevState) => ({
                            ...prevState,
                            sku: event.target.value,
                        }))
                        }
                        />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                        style={{ background: "rgba(0,0,0,0.04)" }}
                        type="text"
                        value={newProductVariation?.gtin || ""}
                        onChange={(event) =>
                        setNewProductVariation((prevState) => ({
                            ...prevState,
                            gtin: event.target.value,
                        }))
                        }
                        />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                        style={{ background: "rgba(0,0,0,0.04)" }}
                        type="number"
                        step="0.01"
                        value={newProductVariation?.price || ""}
                        onChange={(event) =>
                        setNewProductVariation((prevState) => ({
                            ...prevState,
                            price: event.target.value,
                        }))
                        }
                        />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                        style={{ background: "rgba(0,0,0,0.04)" }}
                        type="number"
                        step="0.01"
                        value={newProductVariation?.oldPrice || ""}
                        onChange={(event) =>
                        setNewProductVariation((prevState) => ({
                            ...prevState,
                            oldPrice: event.target.value,
                        }))
                        }
                        />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    </div>
                    </GridColumn>
                </>
            )} */}
        </div>
    )
}

export default ProductVariantos;
