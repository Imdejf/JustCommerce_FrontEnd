export interface IAttribute {
    storeId: string;
    name: string;
    groupId: string;
    productAttributeLangs: AttributeLangs[];
} 

export interface AttributeInterface{
    attributeId: string;
    storeId: string;
    name: string;
    groupId: string;
    attributeGroup: AttributeGroup;
    productAttributeLangs: AttributeLangs[];
}

interface AttributeLangs {
    languageId: string;
    productAttributeId: string;
    name: string;
}

export interface AttributeGroup {
    id:string;
    name:string;
}

export interface IProductAttributeLangs {
    LanguageId: string;
    Name: string;
} 