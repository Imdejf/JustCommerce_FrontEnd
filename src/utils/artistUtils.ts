import i18next from "i18next";
import * as Yup from "yup";

import { ISelectOption } from "components/common/inputs/inputTypes";

import {
  IArtist,
  IArtistDTO,
  ArtistStatus,
  IArtistRequest,
  ArtistRole,
  ArtistInterface,
} from "types/artistTypes";
import { ICheckboxValue } from "types/globalTypes";
import { IPermissions } from "types/permissionsTypes";
import { enumToSelectOptions } from "utils/baseUtils";

import { Regex } from "./constants/constants";
import { validateFile, validationMessage } from "./validation";

export const getArtistInitValues = (artist: IArtist) => ({
  id: artist.id || "",
  name: artist.name || "",
  firstName: artist.firstName || "",
  lastName: artist.lastName || "",
  email: artist.email || "",
  isni: artist.isni || "",
  spotifyId: artist.spotifyId || "",
  iTunesId: artist.iTunesId || "",
  isBand: artist.isBand || { checked: false },
  phoneNumber: artist.phoneNumber || "",
  photoFile: artist.photoFile,
  status: artist.status || ArtistStatus.Unverified,
  // isAssignedToAnyActiveItem: artist.isAssignedToAnyActiveItem || false,
});

const externalIdsValidation = (
  id1: string,
  id2: string,
  status: ArtistStatus
) => {
  return status === ArtistStatus.Verified
    ? !id1?.length && !id2?.length
    : false;
};

const artistFirstAndLastNameValidation = (
  isBand: ICheckboxValue,
  status: ArtistStatus
) =>
  (status === ArtistStatus.Verified || status === ArtistStatus.Unverified) &&
  !isBand.checked;

export const artistValidations = Yup.object().shape({
  // photoFile: validateFile.image("photoFile"),
  // name: Yup.string().when("status", {
  //   is: (val: ArtistStatus) =>
  //     val === ArtistStatus.Verified || val === ArtistStatus.Unverified,
  //   then: Yup.string().required(validationMessage.isRequired),
  // }),
  FirstName: Yup.string()
    .max(50, validationMessage.max(50))
    .required(validationMessage.isRequired),

  LastName: Yup.string()
    .max(50, validationMessage.max(50))
    .required(validationMessage.isRequired),
  Email: Yup.string()
    .required(validationMessage.isRequired)
    .email(validationMessage.invalidEmail)
    .max(100, validationMessage.max(100)),
  PhoneNumber: Yup.string()
    .max(15, validationMessage.max(15))
    .matches(Regex.phone, validationMessage.invalidPhone),
  Password: Yup.string().required(validationMessage.isRequired),
  PasswordCopy: Yup.string()
    .oneOf([Yup.ref("Password"), null], validationMessage.passwordsDontMatch)
    .required(validationMessage.isRequired),
});

export const artistFromDTO = (artistDTO: ArtistInterface): ArtistInterface => {
  const { Position, ...artist } = artistDTO;

  return {
    ...artist,
    Position: "",
  };
};

export const artistToDTO = (artist: IArtist): IArtistRequest => {
  const { isBand, photoFile, ...restOfArtist } = artist;
  const data: IArtistRequest = {
    isBand: isBand.checked,
    photoFile: photoFile?.base64String || "",
    removePhoto: !photoFile?.base64String,
    ...restOfArtist,
  };

  return data;
};

export const filterStatusOptions = (
  initStatusOptions: Array<ISelectOption<ArtistStatus>>,
  initArtist: IArtist,
  permissions: IPermissions
) => {
  let options = initStatusOptions;

  // if (initArtist.isAssignedToAnyActiveItem) {
  //   options = options.filter((opt) => opt.value !== ArtistStatus.Hold);
  // }

  if (
    initArtist.status === ArtistStatus.Verified &&
    !permissions.Artist.DowngradeStatus.checked
  ) {
    options = options.filter(
      (opt) =>
        ![ArtistStatus.Processing, ArtistStatus.Unverified].includes(opt.value)
    );
  }

  return options;
};

export const ckeckNameEditable = (artist: IArtist, permissions: IPermissions) =>
  permissions.Artist.EditName.checked;
//  ||
// (!artist.isAssignedToAnyActiveItem && artist.status === ArtistStatus.Unverified);

export const getArtistRolesOptions = () => {
  const options = enumToSelectOptions(ArtistRole).map(({ value, label }) => ({
    value,
    label: i18next.t(`artist.roles.${label}`),
  }));
  return options;
};
