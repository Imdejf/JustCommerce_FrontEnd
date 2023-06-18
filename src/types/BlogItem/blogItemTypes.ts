export interface IBlogItemInterface {
    id: string;
    name: string;
    slug: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
    author: string;
    isActive: boolean;
    createdOn: string;
    thumbnailImageId: string;
    thumbnailImage: IMediaEntity;
    blogItemLangs: IBlogItemLangEntity[];
  }
  
  interface IBlogItemLangEntity {
    blogItemId: string;
    languageId: string;
    name: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
  }
  
  interface IMediaEntity {
    id: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string | null;
    titleAttribute: string | null;
    mediaLangs: IMediaLangEntity[];
  }
  
  interface IMediaLangEntity {
    mediaId: string;
    media: IMediaEntity;
    languageId: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string | null;
    titleAttribute: string | null;
  }
  