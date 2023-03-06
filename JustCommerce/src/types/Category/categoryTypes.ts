import {MediaInterface, IMediaInterface} from "../Common/commonTypes"

export interface ICategory {
    Slug: string;
    ParentCategoryId: string;
    Name: string;
    MetaTitle: string;
    MetaKeywords: string;
    MetaDescription: string;
    Description: string;
    DisplayOrder: string;
    IsPublished: boolean;
    IncludeInMenu: boolean;
    Deleted: boolean;
    ThumbnailImage: IMediaInterface;
    StoreId: string;
    CategoryLangs:Array<ICategoryLangs>
}

export interface CategoryInterface {
    CategoryId: string;
    Slug: string;
    ParentCategoryId: string;
    Name: string;
    MetaTitle: string;
    MetaKeywords: string;
    MetaDescription: string;
    Description: string;
    DisplayOrder: number;
    IsPublished: string;
    IncludeInMenu: string;
    Deleted: string;
    ThumbnailImageId: string;
    ThumbnailImage: MediaInterface;
    UpdatePhoto: boolean;
    StoreId: string;
    CategoryLangs:Array<CategoryLangs>
}

export interface CategoryLangs {
    CategoryId: string;
    LanguageId: string;
    Name: string;
    Description: string;
    MetaKeywords: string;
    MetaDescription: string;
    MetaTitle : string;
}

export interface ICategoryLangs {
    LanguageId: string;
    Name: string;
    Description: string;
    MetaKeywords: string;
    MetaDescription: string;
    MetaTitle : string;
}



