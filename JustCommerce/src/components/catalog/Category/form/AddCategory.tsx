// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ContentContainer from "../../../layout/ContentContainer";
import FormSection from "../../../common/forms/FormSection";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { toast } from "react-toastify";
import { showServerErrors } from "../../../../utils/errorsUtils";
import TextInput from "components/common/inputs/textInput/TextInput";
import { addProductOption, productOptionValidationSchema } from "./ProductOptionHelper"
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { IProductOption } from "../../../../types/ProductOption/productOptionTypes"
import { ICategory, ICategoryLang, ICategoryLangs } from "../../../../types/Category/categoryTypes"
import productOptionServices from "services/ProductOption/productOptionServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import categoryServices from "services/Category/categoryServices";
import CategoryForm from "./CategoryForm";
import { MediaInterface, IMediaInterface, IMediaLangs } from "types/Common/commonTypes";
import { convertToHTML } from 'draft-convert';

const AddCategory: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const [allActiveLanguages, setAllActiveLanguages] = 
    useState<Array<any> | null>(null);
    const [category, setCategory] = useState<ICategory | null>(null);
    const { goBack } = useHistory();
    const newCategory: ICategory = {
        StoreId: "",
        Slug: "",
        Name: "",
        Description: "",
        MetaTitle: "",
        MetaKeywords: "",
        MetaDescription: "",
        DisplayOrder: 0,
        ParentId: "",
        IncludeInMenu: true,
        IsPublished: true,
        ThumbnailImage: {
        Base64File: {
            Base64String: ""
        },
        SeoFileName: "",
        AltAttribute: "",
        TitleAttribute: "",
        FilePath: "",
        DisplayOrder: 0,
        MediaLangs: []
        },
        CategoryLangs: []
    }

    function handleLanguageValue(value) {
      setLanguageValue(value);
    }

    useEffect(() => {
          if (activeLanguages !== null) {
          let categoryLangs: Array<ICategoryLangs> = [];    
          let categoryMediaLangs: Array<IMediaLangs> = [];
          activeLanguages.languages.map((language) => {
            const categoryLang: ICategoryLangs = {
              LanguageId: language.id,
              Name: "",
              Description: "",
              MetaKeywords: "",
              MetaDescription: "",
              MetaTitle : "",
            };
              

            const categroyMediaLang: IMediaLangs = {
              LanguageId: language.id,
              SeoFileName: "",
              AltAttribute: "",
              TitleAttribute: "",
            }
            categoryLangs.push(categoryLang)
            categoryMediaLangs.push(categroyMediaLang)
          })
          
          newCategory.CategoryLangs = categoryLangs;
          newCategory.ThumbnailImage.MediaLangs = categoryMediaLangs;
      }

      setCategory(newCategory)
    }, [activeLanguages])

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

    const handleSubmit = async (
        categoryData: ICategory,
        base64: string,
        categoryId: string | null,
        updatePhoto: boolean
      ) => {
        try {
          const categoryMaped: ICategory = {
            Slug: categoryData.Slug,
            Name: categoryData.Name,
            MetaTitle: categoryData.MetaTitle,
            MetaKeywords: categoryData.MetaKeywords,
            MetaDescription: categoryData.MetaDescription,
            Description: convertToHTML(categoryData.Description.getCurrentContent()),
            DisplayOrder: categoryData.DisplayOrder,
            IsPublished: categoryData.IsPublished,
            IncludeInMenu: categoryData.IncludeInMenu,
            StoreId: currentUser.storeId,
          }

          if(categoryData.ParentCategoryId) {
            categoryMaped.ParentCategoryId = categoryData.ParentCategoryId
          }
          const thumbnailImage: IMediaInterface = {
            Base64File: {
              Base64String: base64
            },
            SeoFileName: categoryData.ThumbnailImage.SeoFileName,
            AltAttribute: categoryData.ThumbnailImage.AltAttribute,
            TitleAttribute: categoryData.ThumbnailImage.TitleAttribute,
            MediaType: 1,
          }
          const mediaLangsList: Array<IMediaLangs> = [];
          
            categoryData.ThumbnailImage.MediaLangs.map((lang, index) => {
            const mediaLang: IMediaLangs = {
              LanguageId: lang.LanguageId,
              TitleAttribute: lang.TitleAttribute,
              SeoFileName: lang.SeoFileName,
              AltAttribute: lang.AltAttribute
            }
            mediaLangsList.push(mediaLang)
          })

          thumbnailImage.MediaLangs = mediaLangsList

          categoryMaped.ThumbnailImage = thumbnailImage;

         const categoryLangsList: Array<ICategoryLangs> = [];

          categoryData.CategoryLangs.map((lang, index) => {
            const categoryLang: ICategoryLangs = {
              LanguageId: lang.LanguageId,
              Name: lang.Name,
              Description: convertToHTML(lang.Description.getCurrentContent()),
              MetaKeywords: lang.MetaKeywords,
              MetaDescription: lang.MetaDescription,
              MetaTitle: lang.MetaTitle
            }
            categoryLangsList.push(categoryLang)
          })
          categoryMaped.CategoryLangs = categoryLangsList

          await categoryServices.add(
            categoryMaped,
            base64,
            categoryId
          );
          toast.success("Dodano kategorie");
          goBack();
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

      if(!category) {
        return null
      }

      console.log("kdwoakjd")
      console.log(category);
      

      return (
        <ContentContainer
        title="Dodaj kategorie"
        path="/catalog/category"
        >
            {viewTab}
            <CategoryForm
            category={category}
            currentLanguage={currentLanguageValue}
            activeLanguages={activeLanguages}
            // @ts-ignore
            onSubmit={handleSubmit}
            isEdit={false}
            />
        </ContentContainer>
      )
}

export default AddCategory;