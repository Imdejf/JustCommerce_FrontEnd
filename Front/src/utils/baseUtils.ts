import { ISelectOption } from 'components/common/inputs/inputTypes';

export const openInNewTab = (url: string) => {
  if (!window) {
    throw new Error('Window object not exists');
  }

  window.open(url, '_blank')?.focus();
};

export const isActiveOptions = [
  { label: 'Aktywny', value: true },
  { label: 'Nieaktywny', value: false },
];

export const enumToSelectOptions = <T extends { [key: number]: string }>(enumType: T): Array<ISelectOption> =>
  Object.keys(enumType)
    .filter((key) => typeof enumType[key] !== 'number')
    .map((value) => {
      const parsedValue = parseInt(`${value}`);
      const name = enumType[parsedValue];
      return { label: name, value: parsedValue };
    });
