import * as Yup from 'yup';
import { ISelectOption } from '../components/common/inputs/inputTypes';
import { IFinancialData, ILicensor, LicensorStatus, LicensorType } from '../types/licensorTypes';
import { IPermissions } from '../types/permissionsTypes';
import { validateFile, validateNip, validatePesel, validationMessage } from './validation';
import { Regex } from './constants/constants';

export const getLicensorInitValues = (licensor: ILicensor) => ({
  id: licensor.id,
  name: licensor.name || '',
  label: licensor.label || '',
  firstName: licensor.firstName || '',
  lastName: licensor.lastName || '',
  email: licensor.email || '',
  phoneNumber: licensor.phoneNumber || '',
  logoFile: licensor.logoFile,
  status: LicensorStatus.Unverified,
  address: licensor.address,
  financialData: licensor.financialData || {},
  patron: licensor.patron || null,
  certificateOfResidence: licensor.certificateOfResidence,
  certificateValidFrom: licensor.certificateValidFrom || '',
  certificateValidTo: licensor.certificateValidTo || '',
  contracts: licensor.contracts,
});

const identifiersValidationSchemas = {
  [LicensorType.Company]: { func: validateNip, message: validationMessage.invalidNip },
  [LicensorType.Private]: { func: validatePesel, message: validationMessage.invalidPesel },
};

const validateIdentifier = Yup.string().test({
  test: function (value) {
    if (!value) {
      return this.createError({ message: validationMessage.isRequired });
    }

    const { parent }: { parent: IFinancialData } = this;
    const validationSchema = identifiersValidationSchemas[parent.type];

    return validationSchema.func(value) || this.createError({ message: validationSchema.message });
  },
});

const requiredForRelevantStatus = {
  is: (val: LicensorStatus) => [LicensorStatus.Active, LicensorStatus.Hold, LicensorStatus.Verified].includes(val),
  then: Yup.string().required(validationMessage.isRequired),
};

export const licensorValidations = Yup.object().shape({
  name: Yup.string()
    .max(200, validationMessage.max(200))
    .required(validationMessage.isRequired)
    .when('status', requiredForRelevantStatus),
  label: Yup.string().max(200, validationMessage.max(200)).when('status', requiredForRelevantStatus),
  firstName: Yup.string().max(50, validationMessage.max(50)).when('status', requiredForRelevantStatus),
  lastName: Yup.string().max(50, validationMessage.max(50)).when('status', requiredForRelevantStatus),
  email: Yup.string()
    .email(validationMessage.invalidEmail)
    .max(200, validationMessage.max(200))
    .when('status', requiredForRelevantStatus),
  phoneNumber: Yup.string()
    .max(15, validationMessage.max(15))
    .matches(Regex.phone, validationMessage.invalidPhone)
    .when('status', requiredForRelevantStatus),
  logoFile: validateFile.image('logoFile'),
  certificateOfResidence: validateFile.pdf('certificateOfResidence'),
  address: Yup.object({
    postCode: Yup.string().max(20, validationMessage.max(20)),
    street: Yup.string().max(100, validationMessage.max(100)),
    city: Yup.string().max(100, validationMessage.max(100)),
  }).when('status', {
    is: requiredForRelevantStatus.is,
    then: Yup.object({
      postCode: requiredForRelevantStatus.then,
      street: requiredForRelevantStatus.then,
      city: requiredForRelevantStatus.then,
    }),
  }),
  financialData: Yup.object()
    .shape({
      representiveInstanceName: Yup.string().max(100, validationMessage.max(100)),
      identifier: validateIdentifier,
      accountNumber: Yup.string().max(30, validationMessage.max(30)),
      taxOffice: Yup.string().max(300, validationMessage.max(300)),
      costOfObtainingIncomePercent: Yup.number(),
      taxPercent: Yup.number(),
    })
    .when('status', {
      is: requiredForRelevantStatus.is,
      then: Yup.object({
        accountNumber: requiredForRelevantStatus.then,
        identifier: requiredForRelevantStatus.then,
        representiveInstanceName: requiredForRelevantStatus.then,
        taxOffice: requiredForRelevantStatus.then,
      }),
    }),
});

export const licensorToDTO = (licensorDTO: ILicensor) => {};

export const filterStatusOptions = (
  initStatusOptions: Array<ISelectOption<LicensorStatus>>,
  initLicensor: ILicensor,
  permissions: IPermissions
) => {
  let options = initStatusOptions;

  // if (initLicensor.isAssignedToAnyActiveItem) {
  //   options = options.filter((opt) => opt.value !== LicensorStatus.Hold);
  // }

  // if (initLicensor.status === LicensorStatus.Verified && !permissions.Licensor.DowngradeStatus.checked) {
  //   options = options.filter((opt) => ![LicensorStatus.Processing, LicensorStatus.Unverified].includes(opt.value));
  // }

  return options;
};

export const ckeckNameEditable = (licensor: ILicensor, permissions: IPermissions) => true;
// permissions.Licensor.EditName.checked ||
// (!licensor.isAssignedToAnyActiveItem && licensor.status === LicensorStatus.Unverified);
