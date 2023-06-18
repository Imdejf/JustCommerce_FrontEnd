// @ts-nocheck
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";
import { showServerErrors } from "../../../../utils/errorsUtils";
import { ICategory, Category } from "../../../../types/Category/categoryTypes"
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import categoryServices from "services/Category/categoryServices";
import CategoryForm from "./CategoryForm";
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { CategoryInterface } from "../../../../types/Category/categoryTypes";

const AddCategory: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = 
    useState<CategoryInterface | null>(null);
  
    function convertToDraft(value) {
      const contentState = convertFromHTML(value);
      const editorState = EditorState.createWithContent(contentState);

      return editorState;
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
              CategoryId: id,
              Slug: slug,
              ParentCategoryId: parentCategoryId,
              Name: name,
              MetaTitle: metaTitle,
              MetaKeywords: metaKeywords,
              MetaDescription: metaDescription,
              Description: convertToDraft(description),
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
                Description: convertToDraft(categoryLang.description),
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

    function handleLanguageValue(value) {
      setLanguageValue(value);
    }

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

  if(!category) {
    return false;
  }

    const handleSubmit = async (
      category: any,
      base64: string,
      categoryId: string | null,
      updatePhoto: boolean
      ) => {
        try {
          console.log(categoryId)
          const newCategory: CategoryInterface = {
            CategoryId: category.CategoryId,
            Slug: category.Slug,
            ParentId: categoryId,
            Name: category.Name,
            MetaTitle: category.MetaTitle,
            MetaKeywords: category.MetaKeywords,
            MetaDescription: category.MetaDescription,
            Description: convertToHTML(category.Description.getCurrentContent()),
            DisplayOrder: category.DisplayOrder,
            IsPublished: category.IsPublished,
            IncludeInMenu: category.IncludeInMenu,
            Deleted: category.Deleted,
            ThumbnailImageId: category.ThumbnailImageId,
            UpdatePhoto: updatePhoto,
            ThumbnailImage: {
              Id: category.ThumbnailImage.Id,
              FilePath: category.ThumbnailImage.FilePath,
              SeoFileName: category.ThumbnailImage.SeoFileName,
              AltAttribute: category.ThumbnailImage.AltAttribute,
              TitleAttribute: category.ThumbnailImage.TitleAttribute,
              MediaType: category.ThumbnailImage.MediaType,
              Base64File: {
                Base64String: base64
              },
              MediaLangs: category.ThumbnailImage.MediaLangs.map((mediaLang) => ({
                MediaId: mediaLang.MediaId,
                LanguageId: mediaLang.LanguageId,
                FilePath: mediaLang.FilePath,
                SeoFileName: mediaLang.SeoFileName,
                AltAttribute: mediaLang.AltAttribute,
                TitleAttribute: mediaLang.TitleAttribute,
              })),
            },
            StoreId: category.StoreId,
            CategoryLangs: category.CategoryLangs.map((categoryLang) => ({
              CategoryId: categoryLang.CategoryId,
              LanguageId: categoryLang.LanguageId,
              Name: categoryLang.Name,
              Description: convertToHTML(categoryLang.Description.getCurrentContent()),
              MetaKeywords: categoryLang.MetaKeywords,
              MetaDescription: categoryLang.MetaDescription,
              MetaTitle: categoryLang.MetaTitle,
            })),
          };
          console.log("alert")
          console.log(newCategory);
          
          await categoryServices.edit(
            newCategory
          );
          toast.success("Dodano kategorie");
          //goBack();
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

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