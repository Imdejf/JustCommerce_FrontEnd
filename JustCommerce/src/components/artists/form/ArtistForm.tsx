import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import DeleteButton from "components/common/buttons/deleteButton/DeleteButton";
import MaskedField from "components/common/inputs/maskedInput/MaskedField";
import FormSection from "components/common/forms/FormSection";
import ImageField from "components/common/inputs/imageInput/ImageField";
import SelectInput from "components/common/inputs/select/Select";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";
import SwitchBlock from "components/common/inputs/switch/SwitchBlock";
import TextField from "components/common/inputs/textInput/TextField";

import { RootState } from "store/store";
import { ArtistInterface, IArtist, IArtistRequest } from "types/artistTypes";
import { ISelectOption } from "components/common/inputs/inputTypes";

import artistsService from "services/artistServices";
import { Mask } from "utils/constants/constants";
import { showServerErrors } from "utils/errorsUtils";
import {
  artistToDTO,
  artistValidations,
  ckeckNameEditable,
  filterStatusOptions,
  getArtistInitValues,
} from "utils/artistUtils";

interface IEditArtistProps {
  artist: ArtistInterface;
  statusOptions: Array<ISelectOption>;
  isEdit: boolean;
  onSubmit: (values: IArtistRequest) => void;
}

const ArtistForm: React.FC<IEditArtistProps> = ({
  artist,
  isEdit,
  statusOptions: initStatusOptions,
  onSubmit,
}) => {
  // const permissions = useSelector((state: RootState) => state.userPermissions);
  const { replace } = useHistory();

  const initValues = artist;

  // if (!permissions) {
  //   return null;
  // }

  // const statusOptions = isEdit
  //   ? filterStatusOptions(initStatusOptions, artist, permissions)
  //   : initStatusOptions;
  // const nameEditIdEnabled = !isEdit || ckeckNameEditable(artist, permissions);

  const handleSubmit = (values: IArtist) => {
    //@ts-ignore
    onSubmit(values);
  };

  return (
    <Formik
      //@ts-ignore
      initialValues={initValues}
      validationSchema={artistValidations}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ errors, isSubmitting, values, setFieldValue }) => (
        <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
          <FormSection isDisabled={false} label="Foto">
            <ImageField
              name="photoFile"
              className="mx-auto md:mx-0 mb-8"
              imgSrc={values.photoFile?.path}
            />
          </FormSection>
          <FormSection isDisabled={false} label="Dane podstawowe">
            <TextField
              // isBlocked={!nameEditIdEnabled}
              name="Email"
              label="E-mail"
              helperText={errors.email}
            />
          </FormSection>

          <FormSection isDisabled={false} sublabel="">
            <TextField
              name="FirstName"
              label="Imię"
              helperText={errors.firstName}
            />
            <TextField
              name="LastName"
              label="Nazwisko"
              helperText={errors.lastName}
            />
            <MaskedField
              name="PhoneNumber"
              label="Numer telefonu"
              mask={Mask.Phone}
              helperText={errors.phoneNumber}
            />
          </FormSection>

          <FormSection isDisabled={false} label="Hasło">
            <TextField name="Password" label="Hasło" type="password" />

            <TextField
              name="PasswordCopy"
              label="Powtórz hasło"
              type="password"
            />
          </FormSection>

          {/* <FormSection isDisabled={false} label="Status">
            <SelectInput
              name="status"
              label="Typ"
              items={statusOptions}
              defaultValue={artist.status}
            />
          </FormSection> */}

          <div className="flex gap-x-2">
            <SubmitButton isSubmitting={false} className="mt-6 ">
              Zapisz
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArtistForm;
