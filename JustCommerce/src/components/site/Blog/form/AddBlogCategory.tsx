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
import attributeGroupServices from "services/Attribute/attributeGroupServices";
import attributeServices from "services/Attribute/attributeServices";
import {productAttributeValidationSchema, addBlogCategory} from "./BlogCategoryHelper"
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import { BlogCategoryInterface } from "types/Blog/blogTypes";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import ImageField from "components/common/inputs/imageInput/ImageField";
import HtmlEditor from "components/common/inputs/htmlEditor/htmlEditor";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import blogServices from "services/Blog/blogServices";
import { convertToHTML } from 'draft-convert';

const AddBlogCategory: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [base64, setBase64] = useState("");
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);
    const [checkbox, setCheckbox] = useState(false);

    const blogCategory = {
      name: "",
      slug: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      shortDescription: "",
      description: "",
      displayOrder: "",
      isPublished: false,
      blogCategoryLangs: activeLanguages?.languages?.map(lang => ({
        languageId: lang.id,
        name: "",
        metaTitle: "",
        metaKeywords: "",
        metaDescription: "",
        shortDescription: "",
        description: "",
      })),
      thumbnailImage: {
        base64File: {
          Base64String: "",
        },
        seoFileName: "",
        altAttribute: "",
        titleAttribute: "",
        displayOrder: 0,
        mediaLangs: activeLanguages?.languages?.map(lang => ({ 
          languageId: lang.id,
          seoFileName: "",
          altAttribute: "",
          titleAttribute: ""
        })),
      },
    }
    
    useEffect(() => {
      if (activeLanguages !== null) {
        const viewToRender = (
          <div>
                  {activeLanguages.languages.map((language,  index) => (
                      <div className={`${language.id === currentLanguage ? "block":"hidden"}`}>
                          <FormSection label="SEO zdjęcie">
                              <TextField
                                  name={`thumbnailImage.mediaLangs[${index}].titleAttribute`}
                                  label={"Title attribute"}
                              />
                              <TextField
                                  name={`thumbnailImage.mediaLangs[${index}].altAttribute`}
                                  label={"Alt attribute"}
                              />
                              <TextField
                                  name={`thumbnailImage.mediaLangs[${index}].seoFileName`}
                                  label={"Seo file name"}
                              />
                          </FormSection>
                          <FormSection label="SEO">
                            <TextField
                            name={`blogCategoryLangs[${index}].metaTitle`}
                            label={"Meta Title"}
                            />
                            <TextField
                                name={`blogCategoryLangs[${index}].metaKeywords`}
                                label={"Meta keywords"}
                            />
                            <div className="w-full">
                                <FormSection>
                                    <div className="w-full md:w-formCol-2">
                                        <TextAreaField
                                            name={`blogCategoryLangs[${index}].metaDescription`}
                                            label={"Meta description"}
                                        />
                                    </div>
                                </FormSection>
                            </div>
                            <FormSection>
                              <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                                <span>Opis skrócony</span>
                              </div>
                                  <HtmlEditor name={`blogCategoryLangs[${index}].shortDescription`}/>
                                <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                                  <span>Opis</span>
                              </div>
                                <HtmlEditor name={`blogCategoryLangs[${index}].description`}/> 
                            </FormSection>
                          </FormSection>
                      </div>
                  ))}            
          </div>
        );
        setView(viewToRender);
      }
  }, [currentLanguage]);

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

const handleChange = () => {
  setCheckbox((prev) => !prev);
};

  function nameToSlugFunc() {
    var nameToSlug = formik.current.values.Name.replace(/ /g, "-");
    formik.current.setFieldValue('Slug', nameToSlug);
}

function handleLanguageValue(value) {
  setCurrentLanguage(value);
}

const handleSubmit = async (value) => {
    try {
      const blog = {
        storeId: currentUser.storeId,
        name: value.name,
        slug: value.slug,
        metaTitle: value.metaTitle,
        metaKeywords: value.metaKeywords,
        metaDescription: value.metaDescription,
        shortDescription: convertToHTML(value.shortDescription.getCurrentContent()),
        description: convertToHTML(value.description.getCurrentContent()),
        displayOrder: value.displayOrder,
        isPublished: checkbox,
        thumbnailImage: value.thumbnailImage, 
        blogCategoryLangs: value.blogCategoryLangs
      }
     
      value.thumbnailImage.base64File = {
        base64String: base64
      }

      const blogCategoryLangList: Array<any> = [];

      blog.blogCategoryLangs.map((lang, index) => {
        const categoryLang: any = {
          languageId: lang.languageId,
          name: lang.name,
          shortDescription: convertToHTML(lang.shortDescription.getCurrentContent()),
          description: convertToHTML(lang.description.getCurrentContent()),
          metaKeywords: lang.metaKeywords,
          metaDescription: lang.metaDescription,
          metaTitle: lang.metaTitle
        }
        blogCategoryLangList.push(categoryLang)
      })

      blog.blogCategoryLangs = blogCategoryLangList;

      await blogServices.add(blog)
    } catch (errors: any) {
      showServerErrors(errors);
    }
};

if(!activeLanguages) {
  return null;
}

    return (
        <ContentContainer title="Dodaj kategorie" path="/catalog/product-attribute">
            {viewTab}
            <Formik
            initialValues={blogCategory}
            onSubmit={handleSubmit}
            validationSchema={productAttributeValidationSchema}>
              {({ errors, values, isSubmitting }) => (
              <Form className="handleSubmitflex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
              <div className={`${currentLanguage !== "" ? "hidden" : ""}`}>
               <FormSection label="Kategoria">
                <TextField
                    name="name"
                    label={"Nazwa"}
                />
                <TextField
                    name="slug"
                    label={"Slug"}
                />
                <div>
                    <a className="button button--submit px-36 text-sm rounded-sm opacity-90 w-max" onClick={nameToSlugFunc}>Generuj slug</a>
                </div>
                </FormSection>
              </div>
              {activeLanguages.languages.map((language,  index) => (

              <div className={`${currentLanguage === language.id ? "" : "hidden"}`}>
              <FormSection label="Kategoria">
                <TextField
                    name={`blogCategoryLangs[${index}].name`}
                    label={"Nazwa"}
                />
                </FormSection>
              </div>
              ))}
                <FormSection
                  isDisabled={isSubmitting}
                  label="Zdjęcie kategorii"
                  >
                      <ImageField
                      name="image"
                      className="mx-auto md:mx-0 mb-8"
                      //  @ts-ignore
                      // imgSrc={blogCategory.ThumbnailImage.FilePath}
                      // @ts-ignore
                      base64={base64}
                      setBase64={setBase64}
                      />
                  </FormSection>
                  <div className={`${currentLanguage !== "" ? "hidden" : ""}`}>
                    <FormSection label="SEO zdjęcie">
                        <TextField
                            name="thumbnailImage.titleAttribute"
                            label={"Title attribute"}
                        />
                        <TextField
                            name="thumbnailImage.altAttribute"
                            label={"Alt attribute"}
                        />
                        <TextField
                            name="thumbnailImage.seoFileName"
                            label={"Seo file name"}
                        />
                    </FormSection>
                    <FormSection isDisabled={isSubmitting} label="SEO">
                        <TextField
                            name="metaTitle"
                            label={"Meta Title"}
                        />
                        <TextField
                            name="metaKeywords"
                            label={"Meta keywords"}
                        />
                    </FormSection>
                    <div className="w-full">
                        <FormSection isDisabled={isSubmitting}>
                            <div className="w-full md:w-formCol-2">
                                <TextAreaField
                                    name="metaDescription"
                                    label={"Meta description"}
                                    placeholder={errors.lyrics}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <FormSection>
                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                      <span>Opis skrócony</span>
                    </div>
                        <HtmlEditor name="shortDescription"/>
                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                        <span>Opis</span>
                    </div>
                    <HtmlEditor name="description"/> 
                    </FormSection>
                    <FormSection>
                        <TextField name="displayOrder" label="Display order" type="number" />
                    </FormSection>
                    <div>
                        <label
                            style={{ display: "flex", gap: "15px", alignItems: "center" }}
                        >
                            <input
                            type="checkbox"
                            onChange={handleChange}
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
        </ContentContainer>
    )
}

export default AddBlogCategory