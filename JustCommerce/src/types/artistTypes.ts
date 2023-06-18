import { string } from "yup";
import { IFile } from "./globalTypes";

export interface IArtistDTO extends IExternalIdentifiers {
  email: string;
  firstName: string;
  id: string;
  isBand: boolean;
  lastName: string;
  name: string;
  phoneNumber: string;
  photoFile: string | undefined;
  status: number;
}

export interface IArtistResponse extends Omit<IArtist, "photoFile"> {
  photoFtpPath: string;
}

export interface IArtist {
  email: string;
  firstName: string;
  id: string;
  isBand: { checked: boolean };
  isni: string;
  iTunesId: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  photoFile: IFile | null;
  spotifyId: string;
  status: ArtistStatus;
  hasPresspack?: boolean;
}

export interface ArtistInterface {
  Created: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Id: string;
  Language: number;
  PhoneNumber: string;
  Theme: number;
  IsActive?: boolean;
  Position?: string;
  IsTrainer?: boolean;
  IsPlayer?: boolean;
}

export interface IArtistRequest extends Omit<IArtist, "isBand" | "photoFile"> {
  isBand: boolean;
  photoFile: string;
  removePhoto: boolean;
}

export interface IExternalIdentifiers {
  iTunesId: { value: string };
  spotifyId: { value: string };
  isni: { value: string };
}

export const ArtistLabels = {
  biography: "Bibliografia",
  email: "Email",
  firstName: "Imię",
  id: "Id",
  isBand: "Zespół",
  type: "Typ",
  lastName: "Nazwisko",
  phoneNumber: "Numer telefonu",
  status: "Status",
  name: "Nazwa",
  fullName: "Imię i nazwisko",
  spotifyId: "Spotify Id",
  isni: "ISNI",
  iTunesId: "Itunes Id",
};

export enum ArtistStatus {
  Unverified = 0,
  Processing = 1,
  Verified = 2,
  Hold = 3,
}

export const artistStatusLabels = {
  [ArtistStatus.Unverified]: {
    label: "Nieaktywny",
    value: ArtistStatus.Unverified,
  },
  [ArtistStatus.Processing]: {
    label: "Przetwarzany",
    value: ArtistStatus.Processing,
  },
  [ArtistStatus.Verified]: {
    label: "Aktywny",
    value: ArtistStatus.Verified,
  },
  [ArtistStatus.Hold]: { label: "Zawieszony", value: ArtistStatus.Hold },
};

export const addArtistStatuses: Array<ArtistStatus> = [
  ArtistStatus.Verified,
  ArtistStatus.Unverified,
];

export const editArtistStatuses: Array<ArtistStatus> = [
  ArtistStatus.Verified,
  ArtistStatus.Unverified,
  ArtistStatus.Hold,
  ArtistStatus.Processing,
];

export interface IPresspack {
  presspackId?: string;
  artistId: string;
  biography: string;
  photos: Array<{
    ftpPhototFile: string;
    id: string;
  }> | null;
}

export type PresspackAddType = {
  artistId: string;
  biography: string;
  imagesAsBase64Strings: Array<string>;
};

export type PresspackEditType = {
  presspackId: string;
  biography: string;
  filesToRemoveIds: Array<string>;
  newImagesAsBase64Strings: Array<string>;
};

export type PresspackPhotosFormData = {
  photos: string[];
  removed: string[];
  added: string[];
};

export type ArtistNewStoredFile = {
  artistId: string;
  base64File: string;
};

export type ArtistStoredFile = {
  id: string;
  ftpFilePath: string;
  fileName: string;
};

export type ArtistPropItem = {
  id: string;
  name: string;
  status: number;
  role: number;
};

export enum ArtistRole {
  mainArtist,
  featuredArtist,
  composer,
  lyricist,
  producer,
  orchestra,
  conductor,
  remixer,
  actor,
  arranger,
  choir,
  soloist,
  cymbals,
  flute,
  frenchHorn,
  drums,
  davul,
  guitar,
  mandolin,
  tenorSaxophone,
  accordion,
  mixingEngineer,
}
