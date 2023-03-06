import { AddressLabels, IAddress } from './globalTypes';

export interface IProvider {
  address: IAddress;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  id: string;
  identifier: string;
  name: string;
  phoneNumber: string;
  type: ProviderType;
}

export type ProviderListItem = Pick<IProvider, 'id' | 'contactFirstName' | 'contactLastName' | 'name'>;

export enum ProviderType {
  Private = 0,
  Company = 1,
}

export const providerTypeOptions = [
  { label: 'Osoba prywatna', value: ProviderType.Private },
  { label: 'Firma', value: ProviderType.Company },
];

export enum ProviderStatus {
  Unverified = 0,
  Verified = 1,
  Active = 2,
  Hold = 3,
  Revoked = 4,
}

export const providerStatusOptions = {
  Active: { label: 'Aktywny', value: ProviderStatus.Active },
  Hold: { label: 'Zawieszony', value: ProviderStatus.Hold },
  Revoked: { label: 'Wycofany', value: ProviderStatus.Revoked },
  Unverified: { label: 'Niezweryfikowany', value: ProviderStatus.Unverified },
  Verified: { label: 'Zweryfikowany', value: ProviderStatus.Verified },
};

export const ProviderLabels = {
  contact: 'Kontakt',
  name: 'Nazwa',
  label: 'Label',
  firstName: 'Imię',
  lastName: 'Nazwisko',
  fullName: 'Imię i nazwisko',
  email: 'E-mail',
  phoneNumber: 'Telefon',
  status: 'Status',
  address: 'Adres',
  patron: 'Opiekun',
  contracts: 'Kontrakty',
  type: 'Typ',
  identifier: {
    [ProviderType.Company]: 'NIP',
    [ProviderType.Private]: 'PESEL',
  },
  ...AddressLabels,
};
