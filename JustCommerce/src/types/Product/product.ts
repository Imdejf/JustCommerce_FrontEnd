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
  }

  export interface ProductInterface {
    productId: string;
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
  }

  export interface ProductListItemDTO {
    id: string;
    name: string;
    hasOptions: boolean;
    isVisibleIndividually: boolean;
    createdOn: Date;
    isPublished: boolean;
    isFeatured: boolean;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    stockQuantity?: number;
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
    attributeName: string;
    value: string;
    productAttributeValueLangs: IProductAttributeValueLang[];
  }
  
  export interface IProductAttributeValueLang {

    productAttributeValueId?: string;
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
    display: string;
  }
  
  export interface IProductVariation {
    id: string,
    optionId: string,
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
    filePath: string;
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

export enum DisplayType {
  'text' = 0,
  'color' = 1
}

export enum ProductAvailability {
  available = 0,
  sellerConfirmation = 1,
  threeToSevenDays = 2,
  threeToTenDays = 3,
  twoWeeks = 4,
  threeWeeks = 5,
  threeToFiveWeeks = 6,
  temporarilyUnavailable = 7,
  toOrder = 8
  }

export interface ProductDTO {
  id: string;
  price: number;
  oldPrice?: number;
  specialPrice?: number;
  specialPriceStart?: Date;
  specialPriceEnd?: Date;
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
  ProductAvailability: ProductAvailability;
  isFeatured: boolean;
  stockTrackingIsEnabled: boolean;
  categoryIds: Array<string>;
  attributes: Array<ProductAttributeDTO>;
  options: Array<ProductOptionDTO>;
  variations: Array<ProductVariationDTO>;
  thumbnailImage: MediaDTO;
  images: Array<MediaDTO>;
  brandId?: string;
  taxClassId?: string;
  relatedProducts: Array<ProductLinkDTO>;
  crossSellProducts: Array<ProductLinkDTO>;
  }
  
  export interface ProductAttributeDTO {
  id: string;
  attributeValueId: string;
  name: string;
  value: string;
  groupName: string;
  }
  
  export interface ProductOptionDTO {
  id: string;
  name: string;
  displayType: DisplayType;
  values: Array<ProductOptionValueDTO>;
  }
  
  interface ProductOptionValueDTO {
    key: string;
    display: string;
    productOptionValueLangs: ProductOptionValueLangDTO[];
  }
  
  interface ProductOptionValueLangDTO {
    productOptionValueId: string;
    languageId: string;
    key: string;
    display: string;
  }

  

  export interface ProductVariationDTO {
    id: string;
    name: string;
    normalizedName: string;
    sku: string;
    gtin: string;
    price: number;
    oldPrice?: number;
    thumbnailImage: MediaDTO;
    images: Array<MediaDTO>;
    optionCombinations: Array<ProductOptionCombinationDTO>;
    }
    
    export interface ProductOptionCombinationDTO {
    optionId: string;
    optionName: string;
    value: string;
    sortIndex: number;
    }
    
    export interface ProductMediaDTO {
      id: string;
      productId: string;
      mediaId: string;
      displayOrder: number;
      media: MediaDTO;
    }
    
    export interface MediaDTO {
      productId: string;
      mediaId: string;
      seoFileName: string;
      altAttribute: string;
      titleAttribute: string;
      filePath: string;
      displayOrder: number;
      productMediaLangs: ProductMediaLangDTO[];
    }
    
    export interface ProductMediaLangDTO {
      mediaId: string;
      languageId: string;
      filePath?: string;
      seoFileName?: string;
      altAttribute?: string;
      titleAttribute?: string;
    }

    export interface ProductLinkDTO {
    id: string;
    name: string;
    isPublished: boolean;
    }

