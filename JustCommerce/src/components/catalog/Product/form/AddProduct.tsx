// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";
import FormSection from "../../../common/forms/FormSection";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { showServerErrors } from "../../../../utils/errorsUtils";
import TextInput from "components/common/inputs/textInput/TextInput";
import productServices from "services/Product/productServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import categoryServices from "services/Category/categoryServices";
import ProductForm from "./ProductForm";
import { productValidation } from "../utils/helpers";
import ImageField from "components/common/inputs/imageInput/ImageField";
import { convertToHTML } from 'draft-convert';
import { IMedia, IProduct, IProductAttributeValue, IProductMediaLang,IProductLang, IProductLink, IProductOptionValue, IProductVariation } from "../../../../types/Product/product"
import { IProductOption } from "types/ProductOption/productOptionTypes";
import ImagesTable from "./tabs/ImagesTable";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import HtmlEditor from "components/common/inputs/htmlEditor/htmlEditor";
import SelectBrands from "components/common/inputs/select/SelectBrand";
import SelectTaxClasses from "components/common/inputs/select/SelectTaxClass";
import { log } from "console";

const AddProduct: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [currentLanguageValue, setLanguageValue] = useState('');
    
    const [brandsOptions, setBrandOptions] = useState<Array<ISelectOption>>([])
    const [selectedBrand, setSelectedBrand] = useState({});
    const [taxClassOptions, setTaxClassOptions] = useState<Array<ISelectOption>>([])
    const [selectedTaxClass, setTaxClass] = useState({});

    const [viewTab, setViewTab] = useState(null);
    const [view, setView] = useState(null);
    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const { goBack } = useHistory();

    const product: IProduct = {
      currentUserId: "",
      storeId: "",
      price: 0,
      oldPrice: 0,
      specialPrice: 0,
      specialPriceStart: null,
      specialPriceEnd: null,
      name: "",
      slug: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      sku: "",
      gtin: "",
      shortDescription: "",
      description: "",
      specification: "",
      isCallForPricing: true,
      isAllowToOrder: true,
      isPublished: true,
      isFeatured: false,
      isBestseller: false,
      isHomePage: false,
      IsNew: false,
      stockTrackingIsEnabled: false,
      taxId: null,
      vendorId: null,
      brandId: null,
      productLangs: activeLanguages?.languages?.map(lang => ({
        languageId: lang.id,
        name: "",
        normalizedName: "",
        shortDescription: "",
        description: "",
        specification: "",
        metaKeywords: "",
        metaDescription: "",
      
      })),
      thumbnailImage: {
        base64File: {
          Base64String: "",
        },
        seoFileName: "",
        altAttribute: "",
        titleAttribute: "",
        displayOrder: 0,
        productMediaLangs: activeLanguages?.languages?.map(lang => ({ 
          languageId: lang.id,
          seoFileName: "",
          altAttribute: "",
          titleAttribute: ""
           
        })),
      },
      medias:[]
    };

    const [medias, setMedias] = useState<IMedia[]>(product.medias);
    //boolean
    const [isPublished, setIsPublished] = useState(product.isPublished);
    const [isCallForPricing, setIsCallForPricing] = useState(product.isCallForPricing);
    const [isBestseller, setIsBestseller] = useState(product.isBestseller);
    const [isHomePage, setIsHomePage] = useState(product.isHomePage);
    const [isNew, setIsNew] = useState(product.isNew);

    function handleLanguageValue(value) {
      setLanguageValue(value);
    }

    function handlePublishedChange() {
      setIsPublished(!isPublished);
      product.isPublished = !isPublished;
    }

    function handleCallForPricingChange() {
      setIsCallForPricing(!isCallForPricing);
      product.isCallForPricing = !isCallForPricing;
    }

    function handleBestsellerChange() {
      setIsBestseller(!isBestseller);
      product.isBestseller = !isBestseller;
    }

    function handleHomePageChange() {
      setIsHomePage(!isHomePage);
      product.isHomePage = !isHomePage;
    }

    function handleNewChange() {
      setIsNew(!isNew);
      product.isNew = !isNew;
    }

    function nameToSlugFunc() {
      var nameToSlug = formik.current.values.Name.replace(/ /g, "-");
      formik.current.setFieldValue('slug', nameToSlug);
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
      console.log(product)
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
    }
}

    useEffect(() => {
      if (activeLanguages !== null) {
        const viewToRender = (
          <div>
            {product.thumbnailImage.productMediaLangs.map((language,  index) => (
                <div className={`${language.languageId === currentLanguageValue ? "block":"hidden"}`}>
                    <FormSection label={language.id}>
                        <TextField name={`thumbnailImage.productMediaLangs[${index}].seoFileName`} label="Nazwa pliku SEO" />
                        <TextField name={`thumbnailImage.productMediaLangs[${index}].altAttribute`} label="Alt" />
                        <TextField name={`thumbnailImage.productMediaLangs[${index}].titleAttribute`} label="Tytuł" />
                    </FormSection>
                </div>
             ))}
         </div>
        )

        setView(viewToRender);
      }
    }, [currentLanguageValue]);

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

    const handleSubmit = (values) => {
      const thumbnailImage: IMedia = {
        base64File: {
          Base64String: thumbnailBase64
        },
        seoFileName: values.thumbnailImage.seoFileName,
        altAttribute: values.thumbnailImage.altAttribute,
        titleAttribute: values.thumbnailImage.titleAttribute,
        displayOrder: values.thumbnailImage.displayOrder,
        productMediaLangs: values.thumbnailImage.productMediaLangs,
      }

      const newProduct: IProduct = {
        currentUserId: currentUser.userId,
        storeId: currentUser.storeId,
        price: values.price,
        oldPrice: values.oldPrice,
        specialPrice: values.specialPrice,
        specialPriceStart: values.specialPriceStart ? new Date(values.specialPriceStart).toISOString() : null,
        specialPriceEnd: values.specialPriceEnd ? new Date(values.specialPriceEnd).toISOString() : null,
        name: values.name,
        slug: values.slug,
        metaTitle: values.metaTitle,
        metaKeywords: values.metaKeywords,
        metaDescription: values.metaDescription,
        sku: values.sku,
        gtin: values.gtin,
        shortDescription: values.shortDescription !== null && values.shortDescription !== '' ? convertToHTML(values.shortDescription.getCurrentContent()) : "",
        description: values.description !== null && values.description !== '' ? convertToHTML(values.description.getCurrentContent()) : "",
        specification: values.specification !== null && values.specification !== '' ? convertToHTML(values.specification.getCurrentContent()) : "",
        isCallForPricing: isCallForPricing,
        isAllowToOrder: values.isAllowToOrder,
        isPublished: isPublished,
        isFeatured: values.isFeatured,
        isBestseller: isBestseller,
        isHomePage: isHomePage,
        IsNew: isNew,
        stockTrackingIsEnabled: values.stockTrackingIsEnabled,
        taxId: values.taxId,
        vendorId: values.vendorId,
        brandId: values.brandId,
        productLangs: values.productLangs.map((lang) => ({
          languageId: lang.languageId,
          name: lang.name,
          normalizedName: lang.normalizedName,
          shortDescription: lang.shortDescription !== null && lang.shortDescription !== '' ? convertToHTML(lang.shortDescription.getCurrentContent()) : "",
          description: lang.description !== null && lang.description !== '' ? convertToHTML(lang.description.getCurrentContent()) : "",
          specification: lang.specification !== null && lang.specification !== '' ? convertToHTML(lang.specification.getCurrentContent()) : "",
          metaKeywords: lang.metaKeywords,
          metaDescription: lang.metaDescription,
        })),
        thumbnailImage: thumbnailImage,
        medias: medias
      }

      productServices.add(newProduct)
    };

      if(!product) {
        return null
      }

      if(!activeLanguages) {
        return null
      }

      return (
        <ContentContainer title="Dodaj produkt" path="/catalog/product">
          <Formik
          initialValues={product}
          onSubmit={handleSubmit}
          validationSchema={productValidation}>
          {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            {viewTab}
            <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
              <FormSection label="produkt">
                  <TextField
                      name="name"
                      label={"Nazwa"}
                  />
                  <TextField
                      name="slug"
                      label={"Slug"}
                  />
                  <div className="h-auto">
                      <a className="button button--submit p-6 text-sm rounded-sm opacity-90 w-max" onClick={nameToSlugFunc}>Generuj slug</a>
                  </div>
                </FormSection>              
              <FormSection>
              <SelectBrands
                name="brandId"
                label={"Brand"}
                items={brandsOptions}
                selectedItem={selectedBrand}
                setSelectedItem={setSelectedBrand}
                >
              </SelectBrands>
              </FormSection>
            </div>

            <div className={`${currentLanguageValue !== "" ? "" : "hidden"}`}>
            {product.productLangs.map((language,  index) => (
                <div className={`${language.languageId === currentLanguageValue ? "block":"hidden"}`}>
                    <FormSection label="produkt">
                        <TextField name={`productLangs[${index}].name`} label="Nazwa" />
                    </FormSection>
                </div>
            ))}            
          </div>

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
            <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
              <FormSection label="Miniatura - SEO">
                    <TextField name="thumbnailImage.seoFileName" label="Nazwa pliku SEO"/>
                    <TextField name="thumbnailImage.altAttribute" label="Alt"/>
                    <TextField name="thumbnailImage.titleAttribute" label="Tytuł"/>
              </FormSection>
            </div>
            {view}
            <FormSection label="Zdjęcia">
                <ImagesTable
                activeLanguages={activeLanguages}
                addImage={addImage}
                photos={medias}
                editImage={editImage}/>
              </FormSection>
              <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                <FormSection>
                  <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                      <span>Opis skrócony</span>
                  </div>
                      <HtmlEditor name="shortDescription"/>
                  </FormSection>
                  <FormSection>
                  <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                      <span>Opis</span>
                  </div>            
                  <HtmlEditor name="description"/>
                  </FormSection>
                  <FormSection>
                  <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                      <span>Specyfikacja</span>
                  </div>
                  <HtmlEditor name="specification"/>
                </FormSection>
              </div>
              <div className={`${currentLanguageValue !== "" ? "" : "hidden"}`}>
                {product.productLangs.map((language,  index) => (
                  <div className={`${language.languageId === currentLanguageValue ? "block":"hidden"}`}>
                    <FormSection>
                      <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                          <span>Opis skrócony</span>
                      </div>
                          <HtmlEditor name={`productLangs[${index}].shortDescription`}/>
                      </FormSection>
                      <FormSection>
                      <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                          <span>Opis</span>
                      </div>            
                      <HtmlEditor name={`productLangs[${index}].description`}/>
                      </FormSection>
                      <FormSection>
                      <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                          <span>Specyfikacja</span>
                      </div>
                      <HtmlEditor name={`productLangs[${index}].specification`}/>
                    </FormSection>
                  </div>
                ))}            
              </div>
              <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                <FormSection label="Seo">
                  <TextField name="metaTitle" label="Meta title" type="text" />
                  <TextAreaField name="metaKeywords" label="Meta keywords" type="text" className="mb-20"/>
                  <TextAreaField name="metaDescription" label="Meta description" type="text" />
                </FormSection>
              </div>
              <div className={`${currentLanguageValue !== "" ? "" : "hidden"}`}>
                {product.productLangs.map((language,  index) => (
                  <div className={`${language.languageId === currentLanguageValue ? "block":"hidden"}`}>
                    <FormSection label="Seo">
                      <TextField name={`productLangs[${index}].metatitle`} label="Meta title" type="text" />
                      <TextAreaField name={`productLangs[${index}].metaKeywords`} label="Meta keywords" type="text" className="mb-20"/>
                      <TextAreaField name={`productLangs[${index}].metaDescription`} label="Meta description" type="text" />
                    </FormSection>
                  </div>
                ))}            
              </div>
              <FormSection label="Kod">
                  <TextField name="sku" label="SKU"/>
                  <TextField name="gtin" label="GTIN"/>
              </FormSection>
              <FormSection label="Cena">
                  <TextField name="price" label="Cena (netto)" type="number" />
                  <TextField name="oldPrice" label="Stara cena" type="number" />
              </FormSection>
              <FormSection label="Cena specjalna">
                  <TextField name="specialPrice" label="Cena specjalna" type="number" />
                  <TextField name="specialPriceStart" label="Rozpoczęcie promocji" type="date" />
                  <TextField name="specialPriceEnd" label="Zakończenie promocji" type="date" />
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
                <div>
                  <label style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={handlePublishedChange}
                      style={{ width: "15px", height: "15px" }}
                    />
                    <p style={{ fontSize: "14px", userSelect: "none" }}>Widoczny</p>
                  </label>
                </div>
              </FormSection>
              <FormSection>
                <div>
                    <label
                        style={{ display: "flex", gap: "15px", alignItems: "center" }}
                    >
                        <input
                        type="checkbox"
                        checked={isBestseller}
                        onChange={handleBestsellerChange}
                        style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Bestseller
                        </p>
                    </label>
                </div>
              </FormSection>
              <FormSection>
                <div>
                    <label
                        style={{ display: "flex", gap: "15px", alignItems: "center" }}
                    >
                        <input
                        type="checkbox"
                        checked={isNew}
                        onChange={handleNewChange}
                        style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Nowość
                        </p>
                    </label>
                </div>
              </FormSection>
              <FormSection>
                <div>
                    <label
                        style={{ display: "flex", gap: "15px", alignItems: "center" }}
                    >
                        <input
                        type="checkbox"
                        checked={isHomePage}
                        onChange={handleHomePageChange}
                        style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Dodaj do strony głównej
                        </p>
                    </label>
                </div>
              </FormSection>
              <FormSection>
                <div>
                    <label
                        style={{ display: "flex", gap: "15px", alignItems: "center" }}
                    >
                        <input
                        type="checkbox"
                        checked={isCallForPricing}
                        onChange={handleCallForPricingChange}
                        style={{ width: "15px", height: "15px" }}
                        />
                        <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Zapytaj o cenę
                        </p>
                    </label>
                </div>
              </FormSection>
            <SubmitButton
            isSubmitting={isSubmitting}
            type="submit"
            className="w-80"
            >
                Zapisz
            </SubmitButton>
            </Form>
            )}
          </Formik>
        </ContentContainer>
      )
}

export default AddProduct;