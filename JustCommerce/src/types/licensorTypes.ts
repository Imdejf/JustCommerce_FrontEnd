import { AddressLabels, IAddress, IFile } from './globalTypes';
import { IUser } from './userTypes';

export interface ILicensor {
  id: string;
  name: string;
  label: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  logoFile: IFile | null;
  webPage: string;
  status: LicensorStatus;
  address: IAddress;
  financialData: IFinancialData;
  patron: IUser | null;
  certificateOfResidence: IFile | null;
  certificateValidFrom: string;
  certificateValidTo: string;
  contracts: string;
}

export interface ILicensorDTO {
  id: string;
  name: string;
  label: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  base64LogoFile: string;
  status: LicensorStatus;
  address: IAddress;
  financialData: IFinancialData;
  patronId: string;
  base64CertificateOfResidenceFile: string | undefined;
  certificateValidFrom: string;
  certificateValidTo: string;
  contracts: string;
  removePhoto: boolean;
}

//TDOD :remove this after BE fix
export interface TEMP_ILicensorDTO extends Omit<ILicensorDTO, 'address' | 'id' | 'contracts'> {
  licensorId: string;
  adress: IAddress;
}

export interface IFinancialData {
  type: LicensorType;
  representiveInstanceName: string;
  identifier: string;
  accountNumber: string;
  taxOffice: string;
  costOfObtainingIncomePercent: number;
  taxPercent: number;
}

export interface IPatron {
  id: string;
  userName: string;
  fullName: string;
}

export enum LicensorStatus {
  Unverified = 0,
  Verified = 1,
  Active = 2,
  Hold = 3,
  Revoked = 4,
}

export enum LicensorType {
  Private = 0,
  Company = 1,
}

const FinancialDataLabels: Record<keyof IFinancialData, any> = {
  type: 'Typ',
  representiveInstanceName: 'Reprezentant',
  identifier: {
    [LicensorType.Company]: 'NIP',
    [LicensorType.Private]: 'PESEL',
  },
  accountNumber: 'Numer konta',
  costOfObtainingIncomePercent: 'Procent podatku',
  taxOffice: 'Urząd skarbowy',
  taxPercent: 'Koszt uzyskania przychodu',
};

export const LicensorLabels = {
  contact: 'Kontakt',
  name: 'Nazwa',
  label: 'Label',
  firstName: 'Imię',
  lastName: 'Nazwisko',
  fullName: 'Imię i nazwisko',
  email: 'E-mail',
  phoneNumber: 'Telefon',
  logoFtpFilePath: 'string',
  webPage: 'Strona WWW',
  status: 'Status',
  address: 'Adres',
  financialData: 'Dane finansowe',
  patron: 'Opiekun',
  certificateOfResidence: 'Certyfikat',
  certificateValidFrom: 'Ważny od',
  certificateValidTo: 'Ważny do',
  certificateValidData: 'Ważność certyfikatu',
  contracts: 'Kontrakty',
  ...FinancialDataLabels,
  ...AddressLabels,
};

export const licensorStatusOptions = {
  Active: { label: 'Aktywny', value: LicensorStatus.Active },
  Hold: { label: 'Zawieszony', value: LicensorStatus.Hold },
  Revoked: { label: 'Wycofany', value: LicensorStatus.Revoked },
  Unverified: { label: 'Niezweryfikowany', value: LicensorStatus.Unverified },
  Verified: { label: 'Zweryfikowany', value: LicensorStatus.Verified },
};

export const addLicensorStatuses: Array<Partial<keyof typeof licensorStatusOptions>> = ['Unverified', 'Verified'];

export const editLicensorStatuses: Array<Partial<keyof typeof licensorStatusOptions>> = [
  'Active',
  'Hold',
  'Revoked',
  'Unverified',
  'Verified',
];

export const licensorTypeOptions = [
  { label: 'Osoba prywatna', value: LicensorType.Private },
  { label: 'Firma', value: LicensorType.Company },
];
