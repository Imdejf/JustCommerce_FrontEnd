export interface IProduct {
    currentUserId: string;
    storeId: string;
    price: number;
    oldPrice?: number;
    specialPrice?: number;
    specialPriceStart?: string;
    specialPriceEnd?: string;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    name: string;
    slug: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    sku: string;
    gtin: string;
    shortDescription: string;
    description: string;
    specification: string;
    isPublished: boolean;
    isFeatured: boolean;
    stockTrackingIsEnabled: boolean;
    taxId?: string;
    vendorId?: string;
    brandId?: string;
    productLangs: IProductLang[];
    thumbnailImage?: IMedia;
    medias: IMedia[];
    categoryIds: string[];
    productAttributeValues: IProductAttributeValue[];
    options: IProductOption[];
    variations: IProductVariation[];
    productImages: IMedia[];
    productDocuments: IMedia[];
    relatedProducts?: IProductLink[];
    crossSellProducts?: IProductLink[];
  }
  
  export interface IProductLang {
    languageId: string;
    name: string;
    normalizedName: string;
    shortDescription: string;
    description: string;
    specification: string;
    metaKeywords: string;
    metaDescription: string;
  }
  
  export interface IProductAttributeValue {
    attributeId: string;
    value: string;
    productAttributeValueLangs: IProductAttributeValueLang[];
  }
  
  export interface IProductAttributeValueLang {

    productAttributeValueId: string;
    languageId: string;
    value: string;
  }
  
  export interface IProductOption {
    optionName: string;
    optionId: string;
    name: string;
    displayType: DisplayType;
    values: IProductOptionValue[];
  }

  export interface IProductOptionValue {
    key: string;
    display: string;
    productOptionValueLangs: IProductOptionValueLang[];
  }
  
  export interface IProductOptionValueLang {
    languageId: string;
    key: string;
    value: string;
  }
  
  export interface IProductVariation {
    name: string;
    normalizedName: string;
    sku: string;
    gtin: string;
    price: number;
    oldPrice?: number;
    thumbnailImage: IMedia;
    newImages: IMedia[];
    optionCombinations: IProductOptionCombination[];
  }
  
  export interface IProductOptionCombination {
    optionId: string;
    value: string;
    sortIndex: number;
    productOptionCombinationLangs: IProductOptionCombinationLang[];
  }
  
  export interface IProductOptionCombinationLang {
    productOptionCombinationId: string;
    languageId: string;
    value: string;
  }
  
  export interface IMedia {
    base64File: IBase64File;
    seoFileName: string;
    altAttribute: string;
    titleAttribute: string;
    displayOrder?: number;
    productMediaLangs: IProductMediaLang[];
  }
  
  export interface IProductMediaLang {
    languageId: string;
    seoFileName: string;
    altAttribute: string;
    titleAttribute: string;
  }
  
  export interface IProductLink {
    linkedProductId: string;
    linkType: number;
  }

  interface IBase64File {
    Base64String: string
}

enum DisplayType {
  'text' = 0,
  'color' = 1
}