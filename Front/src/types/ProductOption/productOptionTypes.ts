export interface IProductOption {
    storeId: string;
    name: string;
    groupId: string;
    productOptionLangs: ProductOptionLangs[];
} 

export interface ProductOptionInterface{
    id: string;
    storeId: string;
    name: string;
    productOptionLangs: ProductOptionLangs[];
}

interface ProductOptionLangs {
    languageId: string;
    productOptionId: string;
    name: string;
}