// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

import DeleteButton from "components/common/buttons/deleteButton/DeleteButton";
import FormSection from "components/common/forms/FormSection";
import SelectCategories from "components/common/inputs/select/SelectCategory";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";
import TextField from "components/common/inputs/textInput/TextField";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import InputSearch from "components/common/inputs/searchInput/InputSearch";
import TabContent from "components/common/tabs/TabContent";
import { TagsInput } from "react-tag-input-component";

import ImageField from "components/common/inputs/imageInput/ImageField";
import { 
    
 } from "components/common/inputs/inputTypes";
import TextInput from "components/common/inputs/textInput/TextInput";
import { IProduct, IMedia, IProductMediaLang, IProductOption, IProductVariation, IProductAttributeValue, IProductAttributeValueLang } from "types/Product/product"
import { categoryValidation } from "../utils/helpers"
import productServices from "services/Product/productServices";

import { productValidation } from "../utils/helpers"
import HtmlEditor from "components/common/inputs/htmlEditor/htmlEditor";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { convertToHTML, convertFromHTML } from 'draft-convert';
import TabsView from "components/common/tabs/TabsView";
import Tabs from "components/common/tabs/Tabs";
import SelectBrands from "components/common/inputs/select/SelectBrand";
import SelectTaxClasses from "components/common/inputs/select/SelectTaxClass";
import PhotosPanel from "components/artists/detail/tabs/PressMaterials/PhotosPanel";
import ProductImageInput from "components/common/inputs/imageInput/ProductImageInput";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import styled from "styled-components";
import { IMediaLangs } from "types/Common/commonTypes";
import ImagesTable from "./tabs/ImagesTable";
import ProductVariantos from "./tabs/ProductVariantos";
import SelectOptions from "components/common/inputs/select/SelectOption";
import productOptionServices from "services/ProductOption/productOptionServices";
import { IListPageRequest } from "types/globalTypes";
import ImagesVariationTable from "./tabs/ImagesVariationTable";
import ProductAttribute from "./tabs/ProductAttribute";

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;


interface IProductProps {
    product: IProduct;
    currentLanguage:string;
    activeLanguages: any;
    isEdit: boolean;
    onSubmit: any;
}

const ProductForm: React.FC<IProductProps> = ({
    product,
    currentLanguage,
    activeLanguages,
    isEdit,
    onSubmit,
}) => {
    const { currentUser } = useSelector((state: RootState) => state);
    const formik = useRef(null);
    const [view, setView] = useState(null);
    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const [addedImages, setAddedImages] = useState(false);
    const [editedImages, setEditedImages] = useState(false);
    const [removedImages, setRemovedImages] = useState("");
    const [editPhotos, toggleEditPhotos] = useState(false);

    const [brandsOptions, setBrandOptions] = useState<Array<ISelectOption>>([])
    const [selectedBrand, setSelectedBrand] = useState({});

    const [taxClassOptions, setTaxClassOptions] = useState<Array<ISelectOption>>([])
    const [selectedTaxClass, setTaxClass] = useState({});

    const [medias, setMedias] = useState<IMedia[]>(product.medias);

    //Tab variantos
    const [option, setOption] =
    useState<{ value: number; label: string } | null>(null);
    const [options, setOptions] = useState<
        { value: number; label: string }[]
    >([]);

    const [tags, setTags] = useState([]);
    
    const [addedOptions, setAddedOptions] = useState<Array<IProductOption>>([]);
    const [addedProductVariation, setAddedProductVariation] = useState<Array<IProductVariation>>([]);
    const [editProductVariation, toggleEditProductVariation] = useState(false);
    const [addedThumbnailsVariationIsActive, setAddedThumbnailsVariationIsActive] = useState(false);
    const [addedThumbnailsVariation, setAddedThumbnailsVariation] = useState<IMedia | null>(null);
    const [thumbnailVariationCurrentIndex, setThumbnailVariationCurrentIndex] = useState<number | null>(null);
    const [currentLanguagePhoto, setCurrentLanguagePhoto] = useState("");
    const [viewThumbnails, setViewThumbnails] = useState(null);
    const [thumbnailVariationBase64, setThumbnailVariationBase64] = useState("");
    const [addedImagesVariationIsActive, setAddedImagesVariationIsActive] = useState(false);
    const [mediasVariation, setMediasVariation] = useState<IMedia[]>([]);
    const [editVariationPhotos, toggleVariationEditPhotos] = useState(false);
    const [imageVariationIndex, setImageVariationIndex] = useState<number | null>(null);

    //Attribute
    const [attributeList, setAttributeList] = useState<Array<IProductAttributeValue>>([]);

    function nameToSlugFunc() {
        var nameToSlug = formik.current.values.Name.replace(/ /g, "-");
        formik.current.setFieldValue('Slug', nameToSlug);
    }
    
    const addImage = async (
        photo: IMedia,
        base64: string
    ) => {
        photo.base64File = {
            Base64String: base64
        }
        const newMedias = [...medias, photo];
        product.medias = newMedias
        setMedias(newMedias);
        setAddedImages(true)
    }

    const addVariationImage = async (
        photo: IMedia,
        base64: string
      ) => {
        photo.base64File = {
          Base64String: base64
        };
      
        setMediasVariation(prevState => {
            const updatedMediasVariation = prevState ? [...prevState, photo] : [photo];          
      
          if (imageVariationIndex !== null) {
            setAddedProductVariation(prevState =>
              prevState.map((variation, index) =>
                index === imageVariationIndex
                  ? {
                      ...variation,
                      newImages: updatedMediasVariation
                    }
                  : variation
              )
            );
          }
      
          return updatedMediasVariation;
        });
      };

    const editImage = async (
        index: number,
        base64File: string,
        seoFileName: string,
        titleAttribute: string,
        altAttribute:string,
        displayOrder: number,
        productMediaLang: Array<IProductMediaLang>,
    ) => {
        if(product) {
            const media: IMedia = {
                seoFileName: seoFileName,
                titleAttribute: titleAttribute,
                altAttribute: altAttribute,
                displayOrder: displayOrder,
                base64File: {
                    Base64String: base64File
                },
                productMediaLangs: productMediaLang
            }

            product.medias[index] = media
            
            setMedias(product.medias)

            toast.success("Edytowano zdjęcie!");

            setEditedImages(true);
        }
    }

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
        
        setAddedThumbnailsVariation(media);
        setThumbnailVariationCurrentIndex(index);
        setAddedThumbnailsVariationIsActive(true);
    }

    const setImagesVariation = (index: number) => {
        const selectedProductVariation = addedProductVariation[index];
        const { newImages } = selectedProductVariation;
        setMediasVariation(newImages);
        
        // setMediasVariation(newMediasVariation);
        setImageVariationIndex(index);
        setAddedImagesVariationIsActive(true);
        console.log(mediasVariation)
    };

    const addProductVariation = (productVariation: IProductVariation) => {
        setAddedProductVariation([...addedProductVariation, productVariation]);

    };

    const editedProductVariation = async (
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
            name: name,
            normalizedName: normalizedName,
            sku: sku,
            gtin: gtin,
            price: price,
            oldPrice: oldPrice,
            optionCombinations: optionCombinations
        }
        setAddedProductVariation((prevAddedProductVariation) =>
        prevAddedProductVariation.map((variation, variationIndex) =>
          variationIndex === index ? newEditedProductVariation : variation
        )
      );
    };    

    const addOption = (optionId: string, optionName: string) => {
        const newOption: IProductOption = {
            optionName, optionName,
            optionId: optionId,
            name: "",
            displayType: 0,
            values: []
        }

        setAddedOptions(prevAddedOptions => [...prevAddedOptions, newOption]);
        setOptions(options.filter(option => option.value !== optionId));
    }

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

    const removeOption = (optionId: string, optionName: string) => {
        setAddedOptions(addedOptions.filter(option => option.optionId !== optionId));

        const backOption = {
            value: optionId,
            label: optionName
        };

        if (!options.some(option => option.value === backOption.value)) {
            setOptions([...options, backOption]); 
        }
    }

    useEffect(() => {
        if (option) {
          setOption(option);
        }
      }, [option]);

    useEffect(async () => {
        const request: IListPageRequest = {
            pageNumber: 1,
            pageSize: 50,
            searchString: "",
            storeId: currentUser?.storeId
        }
        const productOptions = await productOptionServices.getAll(request)
        
        const options = productOptions.items.map((item) => ({
            value: item.id,
            label: item.name
          }));
          
          setOptions(options);
    }, [])

    useEffect(() => {
        if(addedThumbnailsVariation !== null) {
            console.log(addedProductVariation)
            const viewToRender = (
                <div>
                   {addedThumbnailsVariation.productMediaLangs.map((language,index) => {
                    return (
                        <div key={index} className={`flex ${language.languageId === currentLanguagePhoto ? "" : "hidden"}`}>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                placeholder="Seo file name"
                                value={language.seoFileName || ""}
                                onChange={(event) => {
                                const value = event.target.value;
                                const updatedLangs = [...addedThumbnailsVariation.productMediaLangs];
                                updatedLangs[index] = { ...language, seoFileName: value };
                                setAddedThumbnailsVariation({
                                    ...addedThumbnailsVariation,
                                    productMediaLangs: updatedLangs,
                                });
                                }}
                            />

                            </div>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                placeholder="Alt attribute"
                                value={language.altAttribute || ""}
                                onChange={(event) => {
                                const value = event.target.value;
                                const updatedLangs = [...addedThumbnailsVariation.productMediaLangs];
                                updatedLangs[index] = { ...language, altAttribute: value };
                                setAddedThumbnailsVariation({
                                    ...addedThumbnailsVariation,
                                    productMediaLangs: updatedLangs,
                                });
                                }}
                            />
                            </div>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                placeholder="Title attribute"
                                value={language.titleAttribute || ""}
                                onChange={(event) => {
                                const value = event.target.value;
                                const updatedLangs = [...addedThumbnailsVariation.productMediaLangs];
                                updatedLangs[index] = { ...language, titleAttribute: value };
                                setAddedThumbnailsVariation({
                                    ...addedThumbnailsVariation,
                                    productMediaLangs: updatedLangs,
                                });
                                }}
                            />
                            </div>
                        </div>
                    );
                })}
                </div>
            )
            setViewThumbnails(viewToRender)
        }
    }, [currentLanguagePhoto, addedThumbnailsVariation])
    
    const handleSubmit = async (values: any) => {

    };

    if(!currentUser) {
        return null
    }

    if(!product) {
        return null;
    }

    if(!activeLanguages) {
        return null;
    }

    const handleTagsInputChange = (tags: string[], index: number) => {
        const option = addedOptions[index];
        const newOptionValue: IProductOptionValue = {
          key: tags[tags.length - 1], // użyj ostatniego wprowadzonego taga jako klucza
          displayType: option.displayType,
          productOptionValueLangs: [] // dodaj puste tablice, gdyż jest to wymagane pole
        };
      
        const newValues = [...option.values, newOptionValue];
        const newOption = { ...option, values: newValues };
        const newAddedOptions = [...addedOptions];
        newAddedOptions[index] = newOption;
      
        setAddedOptions(newAddedOptions);
      };

    const tabs = [
        {
            tab: {
                id: "GeneralInformation",
                label: "Dane uzupełniające",
            },
            content: (
                
                <TabContent id="GeneralInformation">
                    <FormSection label="Miniatura">
                    <ImageField
                        name="PhotoFile"
                        className="mx-auto md:mx-0 mb-8"
                        //  @ts-ignore
                        // imgSrc={product.ThumbnailImage.FilePath}
                        // @ts-ignore
                        base64={thumbnailBase64}
                        setBase64={setThumbnailBase64}
                    />
                    </FormSection>
                    <FormSection label="Zdjęcia">
                        <ImagesTable
                        product={product}
                        activeLanguages={activeLanguages}
                        photos={medias}
                        isAddedPhoto={addedImages}
                        toggleEditPhotos={toggleEditPhotos}
                        editPhoto={editPhotos}
                        addImage={addImage}
                        editImage={editImage}/>
                    </FormSection>
                    <FormSection label="Produkt">
                        <TextField
                            name="Name"
                            label={"Nazwa"}
                        />
                        <TextField
                            name="Slug"
                            label={"Slug"}
                        />
                        <div>
                            <a className="1tton button--submit px-36 text-sm rounded-sm opacity-90 w-max" onClick={nameToSlugFunc}>Generuj slug</a>
                        </div>
                        <SelectBrands
                        name="BrandId"
                        label={"Brand"}
                        items={brandsOptions}
                        selectedItem={selectedBrand}
                        setSelectedItem={setSelectedBrand}
                        >
                        </SelectBrands>
                    </FormSection>
                    <FormSection>
                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                        <span>Opis skrócony</span>
                    </div>
                        <HtmlEditor name="ShortDescription"/>
                    </FormSection>
                    <FormSection>
                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                        <span>Opis</span>
                    </div>            
                    <HtmlEditor name="Description"/>
                    </FormSection>
                    <FormSection>
                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                        <span>Specyfikacja</span>
                    </div>
                    <HtmlEditor name="Specification"/>
                    </FormSection>
                    <FormSection label="Kod">
                        <TextField name="Sku" label="SKU"/>
                        <TextField name="Gtin" label="GTIN"/>
                    </FormSection>
                    <FormSection label="Cena">
                        <TextField name="Price" label="Cena (netto)" type="number" />
                        <TextField name="OldPrice" label="Stara cena" type="number" />
                    </FormSection>
                    <FormSection label="Cena specjalna">
                        <TextField name="SpecialPrice" label="Cena specjalna" type="number" />
                        <TextField name="SpecialPriceStart" label="Rozpoczęcie promocji" type="date" />
                        <TextField name="SpecialPriceEnd" label="Zakończenie promocji" type="date" />
                    </FormSection>
                    <FormSection>
                    <div>
                        <label
                            style={{ display: "flex", gap: "15px", alignItems: "center" }}
                        >
                            <input
                            type="checkbox"
                            //   onChange={handleChange}
                            style={{ width: "15px", height: "15px" }}
                            />
                            <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Włącz śledzenie stanów magazynowych
                            </p>
                        </label>
                    </div>
                    </FormSection>
                    <FormSection>
                        <SelectTaxClasses
                        name="TaxId"
                        label={"Klasa podatkowa"}
                        items={taxClassOptions}
                        selectedItem={selectedTaxClass}
                        setSelectedItem={setTaxClass}
                        >
                        </SelectTaxClasses>
                    </FormSection>
                </TabContent>
            )
        },
        {
            tab: {
                id: "ProductVariantos",
                label: "Warianty produktu",
            },
            content: (
                <TabContent id="ProductVariantos">
                    <FormSection label="Dostępne opcje">
                        <SelectOptions
                        name="Option"
                        items={options}
                        label="Opcje"
                        selectedItem={option}
                        setSelectedItem={setOption}
                        />
                        <Button
                        disabled={!option}
                        className="h-10"
                        onClick={() => {
                            addOption(option.value, option.label)
                        }}
                        variant={ButtonVariant.Submit}>
                            Dodaj opcje
                        </Button>
                    </FormSection>
                    <div className={`${addedOptions.length > 0 ? "" : "hidden"}`}>
                        <FormSection label="Wartość opcji">                    
                        <div>
                            {addedOptions.map((option, index) => (
                                <div className="flex">
                                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                                        <span>{option.optionName}</span>
                                    </div>
                                    <TagsInput
                                    key={option.optionId}
                                    value={tags[index]}
                                    onChange={(newTags: string[]) => handleTagsInputChange(newTags, index)}
                                    name={`option-${option.optionId}`}
                                    placeholder={`Enter ${option.name} values`}
                                    classNames={{
                                        input: 'border-b-2 w-full',
                                        tag: ''
                                    }}
                                    />
                                    <Button
                                    className="h-10"
                                    onClick={() => {
                                    }}
                                    variant={ButtonVariant.Submit}>
                                        Konfiguruj wyświetlanie
                                    </Button>
                                    <Button
                                    className="h-10"
                                    onClick={() => {
                                        removeOption(option.optionId, option.optionName)
                                    }}
                                    variant={ButtonVariant.Abort}>
                                        Usuń opcje
                                    </Button>
                                </div>
                            ))}
                        </div>
                        </FormSection>
                        <div className={`mt-10 ${addedImagesVariationIsActive ? "" : "hidden"}`}>
                            <Button
                                variant={ButtonVariant.Normal}
                                className="mb-5"
                                onClick={() => {
                                        setAddedImagesVariationIsActive(false)
                                    }
                                }>
                                Wróć
                            </Button>
                            <ImagesVariationTable
                                product={product}
                                activeLanguages={activeLanguages}
                                toggleEditPhotos={toggleVariationEditPhotos}
                                photos={mediasVariation}
                                addImage={addVariationImage}
                                
                            />
                        </div>
                        <div className={`mt-10 ${addedThumbnailsVariationIsActive ? "" : "hidden"}`}>
                            <FormSection>
                                {addedThumbnailsVariationIsActive.toString()}
                                <Button
                                variant={ButtonVariant.Normal}
                                className="mb-5"
                                onClick={() => {
                                        setAddedThumbnailsVariationIsActive(false)
                                    }
                                }>
                                Wróć
                            </Button>
                            </FormSection>
                            <FormSection>
                            <div className="px-18 flex justify-between py-8 w-full bg-white opacity-80 rounded-t-sm">
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
                            </div>
                            </FormSection>
                            <FormSection label="Miniatura">
                                <ImageField
                                    name="PhotoFile"
                                    className="mx-auto md:mx-0 mb-8"
                                    //  @ts-ignore
                                    // imgSrc={product.ThumbnailImage.FilePath}
                                    // @ts-ignore
                                    base64={thumbnailVariationBase64}
                                    setBase64={setThumbnailVariationBase64}
                                />
                            </FormSection>
                            <FormSection label="Miniatura">
                                {addedThumbnailsVariation !== null && (
                                    <div>
                                    <div className={`${currentLanguagePhoto === "" ? "" : "hidden"}`}>
                                            <div className="flex">
                                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                                    <input
                                                    style={{ background: "rgba(0,0,0,0.04)" }}
                                                    type="text"
                                                    placeholder="Seo file name"
                                                    value={addedThumbnailsVariation.seoFileName}
                                                    onChange={(event) => {
                                                        const value = event.target.value;
                                                        setAddedThumbnailsVariation({
                                                        ...addedThumbnailsVariation,
                                                        seoFileName: value,
                                                        });
                                                    }}
                                                    />
                                                </div>
                                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                                    <input
                                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                                        type="text"
                                                        placeholder="Alt attribute"
                                                        value={addedThumbnailsVariation.altAttribute}
                                                        onChange={(event) => {
                                                            const value = event.target.value;
                                                            setAddedThumbnailsVariation({
                                                            ...addedThumbnailsVariation,
                                                            altAttribute: value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                                    <input
                                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                                        type="text"
                                                        placeholder="Title attribute"
                                                        value={addedThumbnailsVariation.titleAttribute}
                                                        onChange={(event) => {
                                                            const value = event.target.value;
                                                            setAddedThumbnailsVariation({
                                                            ...addedThumbnailsVariation,
                                                            titleAttribute: value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                        </div>
                                    </div>
                                    {viewThumbnails}
                                    </div>
                                )}
                                <Button
                                    className="h-10"
                                    variant={ButtonVariant.Submit}
                                    onClick={() => {
                                        if (addedThumbnailsVariation && thumbnailVariationCurrentIndex !== null) {
                                            const updatedVariation = {
                                                ...addedProductVariation[thumbnailVariationCurrentIndex],
                                                thumbnailImage: {
                                                  ...addedThumbnailsVariation,
                                                  base64File: {
                                                    Base64String: thumbnailVariationBase64
                                                  }
                                                }
                                              };
                                            const updatedVariations = [...addedProductVariation];
                                            updatedVariations[thumbnailVariationCurrentIndex] = updatedVariation;
                                            setAddedProductVariation(updatedVariations);
                                        }

                                        setAddedThumbnailsVariation(null)
                                        setThumbnailBase64("")
                                        setAddedThumbnailsVariationIsActive(false)
                                    }}
                                >
                                    Dodaj miniature
                                </Button>
                            </FormSection>
                        </div>
                        <div className={`my-10 ${addedThumbnailsVariationIsActive ? "hidden" : ""} ${addedImagesVariationIsActive ? "hidden" : ""}`}>
                            <ProductVariantos
                            product={product}
                            activeLanguages={activeLanguages}
                            options={addedOptions}
                            addedProductVariationList={addedProductVariation}
                            editProductVariation={editProductVariation}
                            addThumbnailsVariation={addThumbnailsVariation}
                            toggleEditProductVariation={toggleEditProductVariation}
                            addProductVariation={addProductVariation}
                            newEditedProductVariation={editedProductVariation}
                            addImagesVariation={setImagesVariation}
                            />
                        </div>
                    </div>
                </TabContent>
            )
        },
        {
            tab: {
                id: "ProductAttributes",
                label: "Atrybuty produktu",
            },
            content: (
                <TabContent id="ProductAttributes">
                    <div
                    className="w-full"
                    >
                        <FormSection>
                            <ProductAttribute
                            product={product}
                            activeLanguages={activeLanguages}
                            productAttributeList={attributeList}
                            addProductAttribute={addProductAttribute}
                            />
                        </FormSection>
                    </div>
                </TabContent>
            )
        },
        {
            tab: {
                id: "CategoryMapping",
                label: "Kategorie",
            },
            content: (
                <TabContent id="CategoryMapping">
                    <div
                    className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                    style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                    >
                        
                    </div>
                </TabContent>
            )
        },
        {
            tab: {
                id: "RelatedProducts",
                label: "Produkty powiązane",
            },
            content: (
                <TabContent id="RelatedProducts">
                    <div
                    className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                    style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                    >
                        
                    </div>
                </TabContent>
            )
        },
        {
            tab: {
                id: "CrossSellProducts",
                label: "Sprzedaż krzyżowa",
            },
            content: (
                <TabContent id="CrossSellProducts">
                    <div
                    className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                    style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                    >
                        
                    </div>
                </TabContent>
            )
        },
        {
            tab: {
                id: "SEO",
                label: "SEO",
            },
            content: (
                <TabContent id="SEO">
                    <div
                    className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                    style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                    >
                        
                    </div>
                </TabContent>
            )
        }
    ]

    return (
        <Formik
        innerRef={formik}
        initialValues={product}
        validationSchema={productValidation}
        onSubmit={handleSubmit}
        validateOnMount
        >
        {({ errors, values, isSubmitting }) => (
            <Form className="handleSubmitflex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                <TabsView>
                    <Tabs tabs={tabs.map((t) => t.tab)} />
                    <div style={{ padding: "40px 4vw 0" }}>
                    {tabs.map((t) => t.content)}
                    </div>
                </TabsView>
            </Form>
        )}
        </Formik>
    )
}

export default ProductForm
