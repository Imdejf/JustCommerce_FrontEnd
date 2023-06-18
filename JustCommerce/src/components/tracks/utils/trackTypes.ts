import { ArtistPropItem } from 'types/artistTypes';
import { Genre } from 'utils/constants/genres';
import { Language } from 'utils/constants/languages';
import { string } from 'yup/lib/locale';

export interface ITrack {
  id: string;
  title: string;
  version: string;
  genre: Genre;
  isrc: string;
  explicitContent: ExplicitContent;
  audioLanguage: Language;
  metadataLanguage: Language;
  pLine: string;
  cLine: string;
  lyrics: string;
  isInstrumental: boolean;
  releaseDate: string;
  duration: number;
  artists: ArtistPropItem[];
  status: TrackStatus;
  audioFile: string;
}

export type TrackRequest = Omit<ITrack, 'artists'> & {
  artists: {
    artistId: string;
    artistRole: number;
  }[];
};

export type TrackListItem = Pick<ITrack, 'id' | 'title' | 'isrc' | 'version'>;

export enum ExplicitContent {
  Explicit = 0,
  Cleaned = 1,
  NotExplicit = 2,
}

export const explicitContentOptions = [
  { label: 'Jawny', value: ExplicitContent.Explicit },
  { label: 'Wyczyszczny', value: ExplicitContent.Cleaned },
  { label: 'Niejawny', value: ExplicitContent.NotExplicit },
];

export enum TrackStatus {
  Active = 2,
  Draft = 0,
  Processing = 1,
  Withdrawn = 3,
}

export const trackStatusOptions = [
  { label: 'Aktywny', value: TrackStatus.Active },
  { label: 'Draft/Projekt', value: TrackStatus.Draft },
  { label: 'Przetwarzanie', value: TrackStatus.Processing },
  { label: 'Wycofany', value: TrackStatus.Withdrawn },
];

export const TrackLabels = {
  title: 'Tytuł',
  version: 'Wersja',
  genre: 'Gatunek',
  isrc: 'ISRC',
  explicitContent: 'Jawny kontent',
  audioLanguage: 'Język audio',
  metadataLanguage: 'Język',
  pLine: 'PLine',
  cLine: 'CLine',
  lyrics: 'Słowa',
  isInstrumental: 'Instrumental',
  releaseDate: 'Data publikacji',
  duration: 'Czas trwania',
  status: 'Status',
  audioFile: 'Plik audio',
  artists: 'Artyści',
};
