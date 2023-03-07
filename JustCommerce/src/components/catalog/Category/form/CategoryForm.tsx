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

import ImageField from "components/common/inputs/imageInput/ImageField";
import { 
    
 } from "components/common/inputs/inputTypes";
import TextInput from "components/common/inputs/textInput/TextInput";
import {ICategory} from "types/Category/categoryTypes"
import { categoryValidation } from "../utils/helpers"
import categoryServices from "services/Category/categoryServices";

import HtmlEditor from "components/common/inputs/htmlEditor/htmlEditor";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { convertToHTML, convertFromHTML } from 'draft-convert';

interface ICategoryProps {
    category: ICategory;
    currentLanguage:string;
    activeLanguages: any;
    isEdit: boolean;
    onSubmit: any;
}

const CategoryForm: React.FC<ICategoryProps> = ({
    category,
    currentLanguage,
    activeLanguages,
    isEdit,
    onSubmit,
}) => {
    const [categoryOptions, setCategoryOptions] = useState<Array<ISelectOption>>([
        { value: null, label: "" },
    ]);
    const formik = useRef(null);
    
    function nameToSlugFunc() {
        var nameToSlug = formik.current.values.Name.replace(/ /g, "-");
        formik.current.setFieldValue('Slug', nameToSlug);
    }
    
    const { currentUser } = useSelector((state: RootState) => state);
    const [queryString, setQueryString] = useState("");
    const [base64, setBase64] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const [updatePhoto, setUpdatePhoto] = useState(false);

    const [view, setView] = useState(null);
    const getAllCategories = async () => {
        try {
            const resp = await categoryServices.getDropDown(currentUser.storeId, queryString);
            //@ts-ignore
            const categoriesArray = [];
            //@ts-ignore
            resp.items.map((single) => {
              return categoriesArray.push({
                value: single.CategoryId,
                label: single.Name,
              });
            });

            //@ts-ignore
            setCategoryOptions(categoriesArray);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        if(base64){
            alert()
            setUpdatePhoto(true);
        }
    }, [base64])

    useEffect(() => {
        if (activeLanguages !== null) {
            console.log(activeLanguages.languages)
          const viewToRender = (
            <div>
                    {activeLanguages.languages.map((language,  index) => (
                        <div className={`${language.id === currentLanguage ? "block":"hidden"}`}>
                            <FormSection label="SEO zdjęcie">
                                <TextField
                                    name={`ThumbnailImage.MediaLangs[${index}].TitleAttribute`}
                                    label={"Title attribute"}
                                />
                                <TextField
                                    name={`ThumbnailImage.MediaLangs[${index}].AltAttribute`}
                                    label={"Alt attribute"}
                                />
                                <TextField
                                    name={`ThumbnailImage.MediaLangs[${index}].SeoFileName`}
                                    label={"Seo file name"}
                                />
                            </FormSection>
                            <FormSection label={"Kategoria"}>
                                <TextField name={`CategoryLangs[${index}].Name`} label="Nazwa" />
                            </FormSection>
                            <FormSection label="SEO">
                                <TextField
                                    name={`CategoryLangs[${index}].MetaTitle`}
                                    label={"Meta Title"}
                                />
                                <TextField
                                    name={`CategoryLangs[${index}].MetaKeywords`}
                                    label={"Meta keywords"}
                                />
                            </FormSection>
                            <div className="w-full">
                                <FormSection>
                                    <div className="w-full md:w-formCol-2">
                                        <TextAreaField
                                        name={`CategoryLangs[${index}].MetaDescription`}
                                        label={"Meta description"}
                                        />
                                    </div>
                                </FormSection>
                                <FormSection>
                                    {/* <FormikEditor name={`CategoryLangs[${index}].Description`} /> */}
                                </FormSection>
                            </div>
                        </div>
                    ))}            
            </div>
          );
          setView(viewToRender);
        }
    }, [currentLanguage]);

    if(!currentUser) {
        return null
    }

    if (!activeLanguages) {
        return null;
    }

    if(!category) {
        return null;
    }

    const handleSearch = (query: string) => {
        setQueryString(query);
    };
    
    const handleSubmit = async (values: any) => {
        console.log(values)
        if (!base64) return toast.error("Dodaj zdjęcie!");
    
        await onSubmit(
          values,
          base64,
          // @ts-ignore
          selectedCategory?.value,
          updatePhoto
        );
    };

    return (
        <Formik
        innerRef={formik}
        initialValues={category}
        validationSchema={categoryValidation}
        onSubmit={handleSubmit}
        validateOnMount
        >
        {({ errors, values, isSubmitting }) => (
        <Form className="handleSubmitflex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                <FormSection
                isDisabled={isSubmitting}
                label="Zdjęcie kategorii"
                >
                    <ImageField
                    name="image"
                    className="mx-auto md:mx-0 mb-8"
                    //  @ts-ignore
                    imgSrc={category.ThumbnailImage.FilePath}
                    // @ts-ignore
                    base64={base64}
                    setBase64={setBase64}
                    />
                </FormSection>
                <div className={`${currentLanguage !== "" ? "hidden" : ""}`}>
                    <FormSection label="SEO zdjęcie">
                        <TextField
                            name="ThumbnailImage.TitleAttribute"
                            label={"Title attribute"}
                        />
                        <TextField
                            name="ThumbnailImage.AltAttribute"
                            label={"Alt attribute"}
                        />
                        <TextField
                            name="ThumbnailImage.SeoFileName"
                            label={"Seo file name"}
                        />
                    </FormSection>
                    <FormSection>
                        <SelectCategories
                            name="CategoryId"
                            label={"Kategoria nadrzędna"}
                            items={categoryOptions}
                            selectedItem={selectedCategory}
                            setSelectedItem={setSelectedCategory}
                        />
                    </FormSection>
                    <FormSection label="Kategoria">
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
                    </FormSection>
                    <FormSection isDisabled={isSubmitting} label="SEO">
                        <TextField
                            name="MetaTitle"
                            label={"Meta Title"}
                        />
                        <TextField
                            name="MetaKeywords"
                            label={"Meta keywords"}
                        />
                    </FormSection>
                    <div className="w-full">
                        <FormSection isDisabled={isSubmitting}>
                            <div className="w-full md:w-formCol-2">
                                <TextAreaField
                                    name="MetaDescription"
                                    label={"Meta description"}
                                    placeholder={errors.lyrics}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <FormSection>
                        <HtmlEditor name="Description" />
                    </FormSection>
                    <FormSection>
                        <TextField name="DisplayOrder" label="Display order" type="number" />
                    </FormSection>
                    <div>
                        <label
                            style={{ display: "flex", gap: "15px", alignItems: "center" }}
                        >
                            <input
                            type="checkbox"
                            // onChange={}
                            style={{ width: "15px", height: "15px" }}
                            />
                            <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Zamieść w menu
                            </p>
                        </label>
                    </div>
                    <div>
                        <label
                            style={{ display: "flex", gap: "15px", alignItems: "center" }}
                        >
                            <input
                            type="checkbox"
                            // onChange={}
                            style={{ width: "15px", height: "15px" }}
                            />
                            <p style={{ fontSize: "14px", userSelect: "none" }}>
                            Widoczne
                            </p>
                        </label>
                    </div>
                </div>
                {view}
                <SubmitButton isSubmitting={isSubmitting} className="mt-6 ">
                     Zapisz
                </SubmitButton>
        </Form>
        )}
        </Formik>
    )
}

export default CategoryForm
  