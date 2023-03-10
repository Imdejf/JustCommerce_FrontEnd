const validationMessages = {
  pl: {
    invalidEmail: 'Niepoprawny e-mail',
    invalidImage: 'Niepoprawny obraz',
    invalidNip: 'Niepoprawny NIP',
    invalidPdf: 'Niepoprawny plik pdf',
    invalidFile: 'Niepoprawny plik',
    invalidPesel: 'Niepoprawny PESEL',
    invalidPhone: 'Niepoprawny numer',
    isRequired: 'Pole wymagane',
    isRequiredOneOf: 'Uzupełnij przynejmniej jedno z tych pól',
    weekPassword: `Hasło musi posiadać min 8 znaków, 1 liczbę, 1 znak zpecjalny, 1 małą oraz 1 wielką literę`,
    passwordsDontMatch: 'Hasła różną się od siebie',
    minItems: 'Wymagany minimum {{minItems}}',
    length: 'Podaj dokładnie {{length}} znaków',
    min: 'Min {{length}} znaków',
    max: 'Max {{length}} znaków',
  },
  en: {
    invalidEmail: 'Invalid email',
    invalidImage: 'Invalid image',
    invalidNip: 'Invalid NIP',
    invalidPdf: 'Invalid pdf',
    invalidFile: 'Invalid file',
    invalidPesel: 'Invalid PESEL',
    invalidPhone: 'Invalid phone',
    isRequired: 'Required',
    isRequiredOneOf: 'Fill at least one of these fields',
    weekPassword: `Password must contain min 8 characters, 1 number, 1 special character, 1 lowercase and 1 uppercase letter`,
    passwordsDontMatch: 'Passwords do not match',
    minItems: 'At least {{minItems}} items',
    length: 'Enter exactly {{length}} characters',
    min: 'Min {{length}} characters',
    max: 'Max {{length}} characters',
  },
};

export default validationMessages;
