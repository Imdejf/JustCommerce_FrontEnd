export interface ILanguage {
    storeId: string;
    isActive: boolean;
    isoCode: string;
    nameOrginal: string;
    uniqueSeoCode:string;
    nameInternational: string;
    defaultLangue: boolean;
    flagFilePath: string;
}

export interface LanguageInterface {
    id: string;
    storeId: string;
    isActive: boolean;
    isoCode: string;
    nameOrginal: string;
    uniqueSeoCode: string;
    nameInternational: string;
    defaultLangue: boolean;
    flagFilePath: string;
}


export interface ILanguageResponse {
    storeId: string;
    languages: Array<LanguageInterface>;
  }

