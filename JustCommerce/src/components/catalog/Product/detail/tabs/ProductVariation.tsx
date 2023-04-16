// @ts-nocheck
import { useState, useEffect, useRef, useCallback  } from "react";
import { useSelector } from "react-redux";
import { IProduct, IProductVariation, IProductOptionCombination, IMedia, ProductDTO } from "types/Product/product";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import productServices from "../../../../../services/Product/productServices"
import SelectOptions from "components/common/inputs/select/SelectOption";
import DropdownPanel from "components/common/panels/DropdownPanel";
import LanugagesTabs from "../../../../common/languages/LanguagesTabs";
import ThumbnailVariation from "./ThumbnailVariation"
import styled from "styled-components";
import { toast } from "react-toastify";
import { showServerErrors } from "../../../../../utils/errorsUtils";
import currentUser from "services/currentUserServices";

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;

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

interface IProductVariationProps {
    product: ProductDTO
    activeLanguages: any
}

const ProductVariation: React.FC<IProductVariationProps> = ({
    product,
    activeLanguages
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
  const [currentLanguagePhoto, setCurrentLanguagePhoto] = useState("");
  const [toggleShowNewCombination, setToggleShowNewCombination] = useState(false)
  const [viewTab, setViewTab] = useState(null);
  const [currentLanguageValue, setLanguageValue] = useState('');
  const [addedProductVariation, setAddedProductVariation] = useState<Array<IProductVariation>>([]);
  const [newProductVariation, setNewProductVariation] = useState<IProductVariation | null>(null);

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
  const [selectedOptionCombination, setSelectedOptionCombination] = useState<IProductOptionCombination[]>([]);
  
  //edit
  const [toggleEditProductVariation, setToggleEditProductVariation] = useState(false)
  const [editedProductVariation, setEditedProductVariation] = useState(null);
  const [newThumbnail, setNewThumbail] = useState<IMedia | null>(null);
  //thumbnail
  const [thumbnailsVariationIsActive, setThumbnailsVariationIsActive] = useState(false);
  const [thumbnailsVariation, setThumbnailsVariation] = useState<IMedia | null>(null);
  const [thumbnailVariationCurrentIndex, setThumbnailVariationCurrentIndex] = useState<number | null>(null);

  const [editedSku, setEditedSku] = useState("");
  const [editedGtin, setEditedGtin] = useState("");
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedOldPrice, setEditedOldPrice] = useState(0);

  function handleLanguageValue(value) {
    setLanguageValue(value);
  }

  const addProductVariation = async (productVariation: IProductVariation) => {
    if(productVariation.optionCombinations.length === 0) {
        toast.error("Musisz wybrać kombinacje");
        return null
    }

    try {

        const productVariationDTO = {
            userId: currentUser.userId,
            storeId: currentUser.storeId,
            productId: product.id,
            variation: productVariation
        }
        console.log(addedProductVariation)
        // await productServices.addVariation(productVariationDTO)
        toast.success("Edytowano opcje");
    } catch(errors: any) {
        showServerErrors(errors);
    }

    setAddedProductVariation([...addedProductVariation, productVariation]);
};

  const addThumbnailsVariation = (index: number) => {
    const media: IMedia = {
        base64File: {
          Base64String: ""
        },
        seoFileName: "",
        altAttribute: "",
        titleAttribute: "",
        productMediaLangs: activeLanguages.languages.map(lang => ({
          languageId: lang.id,
          seoFileName: "",
          altAttribute: "",
          titleAttribute: ""
        }))
    };
    
    setThumbnailsVariation(media);
    setThumbnailVariationCurrentIndex(index);
    setThumbnailsVariationIsActive(true);
  }

  const editThumbnailsVariation = (index: number, thumbnailImage: IMedia) => {
    setThumbnailsVariation(thumbnailImage);
    setThumbnailVariationCurrentIndex(index);
    setThumbnailsVariationIsActive(true);
  }

  const addThumbnail = (thumbnail: IMedia) => {
    setNewThumbail(thumbnail)

    if (thumbnailVariationCurrentIndex !== null) {
      const updatedVariations = [...addedProductVariation];
      updatedVariations[thumbnailVariationCurrentIndex] = {
        ...updatedVariations[thumbnailVariationCurrentIndex],
        thumbnailImage: thumbnail,
      };
      console.log(updatedVariations)
      setAddedProductVariation(updatedVariations);

      console.log(addedProductVariation)
    }
  };

  const handleOptionChangeTest = (event: React.ChangeEvent<HTMLSelectElement>, optionId: string, optionName: string, index: number) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [optionId]: value,
    }));

    const prevOptionCombinationIndex = selectedOptionCombination.findIndex((optionCombination) => optionCombination.optionId === optionId);
    if (prevOptionCombinationIndex !== -1) {
        setSelectedOptionCombination((prevSelectedOptionCombination) => {
            const newSelectedOptionCombination = [...prevSelectedOptionCombination];
            newSelectedOptionCombination.splice(prevOptionCombinationIndex, 1);
            return newSelectedOptionCombination;
        });
    }

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
    if (newProductVariation) {
      const option = product.options.find((option) => option.id === optionId);
      if (option) {
        const combinationIndex = newProductVariation.optionCombinations.findIndex(
          (combination) => combination.optionId === optionId
        );
    
        if (value === "") {
          if (combinationIndex >= 0) {
            newProductVariation.optionCombinations.splice(combinationIndex, 1);
          }
        } else {
          const productOptionValue = option.values.find((v) => v.key === value);
          if (productOptionValue) {
            const productOptionCombinationLangs = productOptionValue.productOptionValueLangs.map((lang) => ({
              productOptionCombinationId: "",
              languageId: lang.languageId,
              value: lang.key,
            }));
            const combination = {
              optionId: optionId,
              value: value,
              sortIndex: product.options.findIndex((option) => option.optionId === optionId),
              productOptionCombinationLangs: productOptionCombinationLangs,
            };
            if (combinationIndex >= 0) {
              newProductVariation.optionCombinations[combinationIndex] = combination;
            } else {
              newProductVariation.optionCombinations.push(combination);
            }
          }
        }
        
        setNewProductVariation({ ...newProductVariation });
      }
    }
};

  const addNewVariation = () => {
    const variation: IProductVariation = {
      name: "",
      normalizedName: "",
      sku: "",
      gtin: "",
      price: 0,
      thumbnailImage: null,
      newImages: [],
      optionCombinations: []
    };

    setNewProductVariation(variation)
}

  const setEditedVariation = (index: number) => {
    setEditedSku(addedProductVariation[index].sku)
    setEditedGtin(addedProductVariation[index].gtin)
    setEditedPrice(addedProductVariation[index].price)
    setEditedOldPrice(addedProductVariation[index].oldPrice)
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

const editedVariation = async (
    optionId: string,
    index:number,
    name: string,
    normalizedName: string,
    sku: string,
    gtin: string,
    price: number,
    oldPrice?: number,
    thumbnailImage: IMedia,
    newImages: IMedia[],
    optionCombinations: IProductOptionCombination[],
) => {
    const newEditedProductVariation: IProductVariation = {
        optionId: optionId,
        name: name,
        normalizedName: normalizedName,
        sku: sku,
        gtin: gtin,
        price: price,
        oldPrice: oldPrice,
        thumbnailImage: thumbnailImage,
        optionCombinations: optionCombinations
    }

    alert(optionId)
    console.log("jifejifew")
    console.log(newThumbnail)
    console.log(thumbnailImage)

    setAddedProductVariation((prevAddedProductVariation) =>
    prevAddedProductVariation.map((variation, variationIndex) =>
      variationIndex === index ? newEditedProductVariation : variation
    )
  );
};    


  useEffect(() => {
    if (activeLanguages !== null) {
        const viewTabToRender = (
            <div className="block">
                <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
            </div>
          );
          setViewTab(viewTabToRender);
    }
}, [activeLanguages]);


useEffect(() => {
    if (product !== null) {
      const variations = product.variations.map((variation) => {
        const thumbnailImage = variation.thumbnailImageUrl
          ? { id: "", mediaUrl: variation.thumbnailImageUrl }
          : undefined;
        const newImages = variation.imageUrls
          ? variation.imageUrls.map((imageUrl, index) => ({
              id: index.toString(),
              mediaUrl: imageUrl,
            }))
          : [];
        const optionCombinations = variation.optionCombinations.map(
          (optionCombination) => ({
            optionId: optionCombination.optionId,
            value: optionCombination.value,
            sortIndex: optionCombination.sortIndex,
            productOptionCombinationLangs:
              optionCombination.productOptionCombinationLangs
          })
        );

        return {
          optionId: variation.id,
          name: variation.name,
          normalizedName: variation.normalizedName,
          sku: variation.sku,
          gtin: variation.gtin,
          price: variation.price,
          oldPrice: variation.oldPrice,
          thumbnailImage: thumbnailImage,
          newImages: newImages,
          optionCombinations: optionCombinations,
        };
      });
      setAddedProductVariation(variations);
    }
  }, [product]);
  

  if (!activeLanguages) {
    return null
  }


  return (
    <DropdownPanel
    label="Warianty produktu"
    >
        <div className="w-full text-sm">
          {viewTab}
          <div className={`${thumbnailsVariationIsActive === true ? "" : "hidden"}`}>
            <ThumbnailVariation
            currentLanguage={currentLanguageValue}
            addThumbnail={addThumbnail}
            thumbnail={thumbnailsVariation}
            setThumbnailsVariationIsActive={setThumbnailsVariationIsActive}
            />
          </div>
          <div className={`${thumbnailsVariationIsActive === false ? "" : "hidden"}`}>
            <div className="px-18 mt-5 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
              <div className="ml-auto" style={{ display: "flex", gap: "25px" }}>
              {toggleShowNewCombination ? (
            <Button
            onClick={() => {
                addProductVariation(newProductVariation)
                setToggleShowNewCombination((prev) => !prev);
                setToggleEditProductVariation(false)
                
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
                    setToggleEditProductVariation((prev) => !prev);
                    setToggleShowNewCombination(false);
                    setEditedProductVariation(null);
                }}
                // disabled={!permissions.Edit}
                variant={ButtonVariant.Submit}
            >
                {toggleEditProductVariation ? "Cofnij" : "Edytuj"}
            </Button>
            )}
              </div>
            </div>
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
                {toggleShowNewCombination && (
                <>
                    <GridColumn cols={8} className="align-center">
                        <div className="bg-white inline-flex bg-opacity-80 p-12 text-center">
                        <div>
                            {product?.options?.map((option) => (
                                <select
                                key={option.optionId}
                                name={option.optionName}
                                value={newProductVariation?.optionCombinations?.find(combination => combination.optionId === option.optionId)?.value || ""}
                                onChange={(event) => handleOptionChange(event, option.id)}
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
            {addedProductVariation.map((singleProductVariation: any, index) => {
                if(index === editedProductVariation) {
                    return (
                        <GridColumn cols={8}>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                {singleProductVariation.optionCombinations.map((optionCombination, index) => {
                                    return (
                                    <span key={index}>
                                        {optionCombination.value}
                                        {index !== singleProductVariation.optionCombinations.length - 1 ? ", " : ""}
                                    </span>
                                    );
                                })}
                                </div>
                                {/* <div className="bg-white bg-opacity-30 p-12 text-center">
                                    {addedProductVariation.map((singleProductVariation: any, index) => {
                                    if (index === editedProductVariation) {
                                        const selectElements = singleProductVariation.optionCombinations.map((optionCombination) => {
                                            console.log("xDkiwdj")
                                            console.log(product.options)
                                            console.log(optionCombination.optionId)
                                            const option = product.options.find((o) => o.optionId === optionCombination.optionId);
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
                                    const missingOptionIds = product.options.filter((option) => !singleProductVariation.optionCombinations.some((optionCombination: any) => optionCombination.optionId === option.optionId)).map((option) => option.optionId);
                                    const missingSelectElements = missingOptionIds.map((missingOptionId) => {
                                    const missingOption = product.options.find((option) => option.optionId === missingOptionId);
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
                                </div> */}
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
                                <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}
                                onClick={() => {
                                    if(singleProductVariation.thumbnailImage == null) {
                                        addThumbnailsVariation(index)
                                    }
                                    else {
                                        editThumbnailsVariation(index, singleProductVariation.thumbnailImage)
                                    }
                                }}>
                                    {singleProductVariation.thumbnailImage == null ? "Dodaj" : "Edytuj"}
                                </Button>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}
                                onClick={() => {
                                    addImagesVariation(index)
                                }}>
                                    Dodaj
                                </Button>
                            </div>
                                {toggleEditProductVariation && (
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
                                            editedVariation (
                                                singleProductVariation.optionId,
                                                index,
                                                "",
                                                "",
                                                editedSku,
                                                editedGtin,
                                                editedPrice,
                                                editedOldPrice,
                                                newThumbnail,
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
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center"></div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center"></div>
                            {/* <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}
                                onClick={() => {
                                    if(singleProductVariation.thumbnailImage == null) {
                                        addThumbnailsVariation(index)
                                    }
                                    else {
                                        editThumbnailsVariation(index, singleProductVariation.thumbnailImage)
                                    }
                                }}>
                                    {singleProductVariation.thumbnailImage == null ? "Dodaj" : "Edytuj"}
                                </Button>
                            </div>
                            <div className="bg-white bg-opacity-30 m-auto p-12 text-center">
                                <Button
                                variant={ButtonVariant.Submit}
                                onClick={() => {
                                    addImagesVariation(index)
                                }}>
                                    Dodaj
                                </Button>
                            </div> */}
                            {toggleEditProductVariation ? (
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
                                        setEditedVariation(index)
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
        </div>
      </div>
    </DropdownPanel>
  )
}

export default ProductVariation