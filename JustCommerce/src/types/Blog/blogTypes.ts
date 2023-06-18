export interface BlogCategoryInterface {
    Id: string;
    StoreId: string;
    Name: string;
    Slug: string;
    MetaTitle: string;
    MetaKeywords: string;
    MetaDescription: string;
    ShortDescription: string;
    Description: string;
    DisplayOrder: number;
    IsPublished: boolean;
    IsDeleted: boolean;
    ThumbnailImageId: string;
    ThumbnailImage: MediaDTO;
    BlogCategoryLangs: BlogCategoryLangDTO[];
  }
  
  interface MediaDTO {
    Id: string;
    FilePath?: string;
    SeoFileName?: string;
    AltAttribute?: string;
    TitleAttribute?: string;
    MediaLangs: MediaLangDTO[];
  }
  
  interface MediaLangDTO {
    MediaId: string;
    LanguageId: string;
    FilePath?: string;
    SeoFileName?: string;
    AltAttribute?: string;
    TitleAttribute?: string;
  }
  
  interface BlogCategoryLangDTO {
    BlogCategoryId: string;
    LanguageId: string;
    Name: string;
    MetaTitle: string;
    MetaKeywords: string;
    MetaDescription: string;
    ShortDescription: string;
    Description: string;
  }
  
  
  
  