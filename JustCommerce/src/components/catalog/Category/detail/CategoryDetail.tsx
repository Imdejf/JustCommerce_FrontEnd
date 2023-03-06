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
import categoryServices from "services/Category/categoryServices";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { IAttribute } from "../../../../types/Attribute/attributeTypes"
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import ProductAttributeDetailTopBar from "./ProductAttributeDetailTopBar";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import { AttributeInterface } from "../../../../types/Attribute/attributeTypes";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import { CategoryInterface } from "types/Category/categoryTypes";
import { title } from "process";
import CategoryDetailTopBar from "./CategoryDetailTopBar";

const CategoryDetail: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const { id } = useParams<{ id: string, storeId: string }>();
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');

    const [queryString, setQueryString] = useState("");
    const [category, setCategory] = 
    useState<CategoryInterface | null>(null);

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    useEffect(() => {
        categoryServices
          .getById(id)
          .then((response) => {
            // @ts-ignore
            const {
                id,
                slug,
                parentCategoryId,
                name,
                metaTitle,
                metaKeywords,
                metaDescription,
                description,
                displayOrder,
                isPublished,
                includeInMenu,
                deleted,
                thumbnailImageId,
                thumbnailImage,
                storeId,
                childCategories,
                categoriesLang,
              } = response;
        
              const category: CategoryInterface = {
                Id: id,
                Slug: slug,
                ParentCategoryId: parentCategoryId,
                Name: name,
                MetaTitle: metaTitle,
                MetaKeywords: metaKeywords,
                MetaDescription: metaDescription,
                Description: description,
                DisplayOrder: displayOrder,
                IsPublished: isPublished,
                IncludeInMenu: includeInMenu,
                Deleted: deleted,
                ThumbnailImageId: thumbnailImageId,
                ThumbnailImage: {
                  Id: thumbnailImage.id,
                  FilePath: thumbnailImage.filePath,
                  SeoFileName: thumbnailImage.seoFileName,
                  AltAttribute: thumbnailImage.altAttribute,
                  TitleAttribute: thumbnailImage.titleAttribute,
                  MediaType: thumbnailImage.mediaType,
                  MediaLangs: thumbnailImage.mediaLangs.map((mediaLang) => ({
                    MediaId: mediaLang.mediaId,
                    LanguageId: mediaLang.languageId,
                    FilePath: mediaLang.filePath,
                    SeoFileName: mediaLang.seoFileName,
                    AltAttribute: mediaLang.altAttribute,
                    TitleAttribute: mediaLang.titleAttribute,
                  })),
                },
                StoreId: storeId,
                CategoryLangs: categoriesLang.map((categoryLang) => ({
                  CategoryId: categoryLang.categoryId,
                  LanguageId: categoryLang.languageId,
                  Name: categoryLang.name,
                  Description: categoryLang.description,
                  MetaKeywords: categoryLang.metaKeywords,
                  MetaDescription: categoryLang.metaDescription,
                  MetaTitle: categoryLang.metaTitle,
                })),
              };
              
              setCategory(category)
          })
          .catch((errors) => {
            showServerErrors(errors);
          });
      }, [id]);
      
      useEffect(() => {
        if (activeLanguages !== null) {

          const viewToRender = (
            <div>
                    {activeLanguages.languages.map((language,  index) => (
                        <div className={`${language.id === currentLanguageValue ? "block":"hidden"}`}>
                        <InfoBox className="bg-white-dirty p-18">
                        <InfoBox.Image src={category ? category.ThumbnailImage.FilePath : ""}/>
                            <InfoBox.Items>
                                <InfoBox.InfoItem label={"Kategoria nadrzędna"} value={`${category?.ParentCategoryId ? "" : "Brak"}`}/>
                                <InfoBox.InfoItem label={"Nazwa"} value={`${category?.CategoryLangs[index].Name}`}/>
                                <InfoBox.HtmlEditor label={"Opis"} value={`${category?.CategoryLangs[index].Description}`}/>
                                <InfoBox.InfoItem label={"Tytuł meta"} value={`${category?.CategoryLangs[index].MetaTitle}`}/>
                                <InfoBox.InfoItem label={"Opis meta"} value={`${category?.CategoryLangs[index].MetaDescription}`}/>
                                <InfoBox.InfoItem label={"Słowa kluczowe"} value={`${category?.CategoryLangs[index].MetaKeywords}`}/>
                            </InfoBox.Items>
                        </InfoBox>
                        </div>
                    ))}            
            </div>
          );
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
      }, [activeLanguages])


      if(!category) {
        return null;
      }
      return(
        <ContentContainer
        title={`${category?.Name}`}
        TopBar={
            <CategoryDetailTopBar
            category={category}
            path="/catalog/category"/>
        }>
            {viewTab}
            <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                <InfoBox className="bg-white-dirty p-18">
                    <InfoBox.Image src={category ? category.ThumbnailImage.FilePath : ""}/>
                    <InfoBox.Items>
                        <InfoBox.InfoItem label={"Kategoria nadrzędna"} value={`${category.ParentCategoryId ? "" : "Brak"}`}/>
                        <InfoBox.InfoItem label={"Nazwa"} value={`${category.Name}`}/>
                        <InfoBox.InfoItem label={"Adres"} value={`${category.Slug}`}/>
                        <InfoBox.HtmlEditor label={"Opis"} value={`${category.Description}`}/>
                        <InfoBox.InfoItem label={"Tytuł meta"} value={`${category.MetaTitle}`}/>
                        <InfoBox.InfoItem label={"Opis meta"} value={`${category.MetaDescription}`}/>
                        <InfoBox.InfoItem label={"Słowa kluczowe"} value={`${category.MetaKeywords}`}/>
                    </InfoBox.Items>
                </InfoBox>
            </div>
            {view}
        </ContentContainer>
      )
}

export default CategoryDetail;