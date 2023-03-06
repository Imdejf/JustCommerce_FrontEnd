export interface MediaInterface {
    Id: string;
    FilePath: string;
    SeoFileName: string;
    AltAttribute: string;
    TitleAttribute: string;
    Base64File: Base64File,
    MediaType: number;
    MediaLangs: Array<MediaLangs>;
}

export interface IMediaInterface {
    Base64File: Base64File,
    SeoFileName: string;
    AltAttribute: string;
    TitleAttribute: string;
    MediaType: string;
    MediaLangs: Array<IMediaLangs>;
}

interface Base64File {
    Base64String: string
}

export interface MediaLangs {
    MediaId: string;
    LanguageId: string;
    FilePath: string;
    SeoFileName: string;
    AltAttribute: string;
    TitleAttribute: string;
}

export interface IMediaLangs {
    LanguageId: string;
    SeoFileName: string;
    AltAttribute: string;
    TitleAttribute: string;
}