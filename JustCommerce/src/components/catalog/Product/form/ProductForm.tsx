// @ts-nocheck
import { useState, useEffect, useRef } from "react";
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

import ImageField from "components/common/inputs/imageInput/ImageField";
import { 
    
 } from "components/common/inputs/inputTypes";
import TextInput from "components/common/inputs/textInput/TextInput";
import { IProduct, IMedia, IProductMediaLang } from "types/Product/product"
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
                            <a className="button button--submit px-36 text-sm rounded-sm opacity-90 w-max" onClick={nameToSlugFunc}>Generuj slug</a>
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
                id: "ProductAttributes",
                label: "Atrybuty produktu",
            },
            content: (
                <TabContent id="ProductAttributes">
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
