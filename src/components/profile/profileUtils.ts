import * as Yup from 'yup';

import { IChangePasswordValues } from '../../types/userTypes';
import { passwordRegEx } from '../auth/authHelpers';

export const changePasswordInitValues: IChangePasswordValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordCopy: '',
};

export const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().matches(
    passwordRegEx,
    'Hasło musi posiadać min 8 znaków, 1 liczbę, 1 znak zpecjalny, 1 małą oraz 1 wielką literę'
  ),
  newPassword: Yup.string()
    .matches(passwordRegEx, 'Hasło musi posiadać min 8 znaków, 1 liczbę, 1 znak zpecjalny, 1 małą oraz 1 wielką literę')
    .required(),
  newPasswordCopy: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Hasła różną się od siebie'),
});
