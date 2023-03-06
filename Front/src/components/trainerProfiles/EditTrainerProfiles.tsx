import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../layout/ContentContainer";
import FormSection from "../common/forms/FormSection";
import MaskedField from "../common/inputs/maskedInput/MaskedField";
import SubmitButton from "../common/buttons/submitButton/SubmitButton";
import TextField from "../common/inputs/textInput/TextField";

import {
  PlayerProfileDetailInterface,
  TrainerProfileDetailInterface,
} from "../../types/userTypes";

import { Mask } from "../../utils/constants/constants";
import { showServerErrors } from "../../utils/errorsUtils";
import playerProfileServices from "services/playerProfileServices";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import ImageField from "components/common/inputs/imageInput/ImageField";
import ProfileDatePicker from "components/common/inputs/Datepicker/ProfileDatePicker";
import { editPlayerProfileValidationSchema } from "./form/authHelpers";
import TextInput from "components/common/inputs/textInput/TextInput";
import trainerProfileServices from "services/trainerProfileServices";

const EditTrainerProfiles: React.FC = () => {
  const [trainerProfile, setTrainerProfile] =
    useState<TrainerProfileDetailInterface | null>(null);
  const [gender, setGender] =
    useState<{ value: number; label: string } | null>(null);
  const [genders, setGenders] = useState<{ value: number; label: string }[]>(
    [],
  );
  const [country, setCountry] =
    useState<{ value: number; label: string } | null>(null);

  const [countries, setCountries] = useState<
    { value: number; label: string }[]
  >([]);
  const [base64, setBase64] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();

  const genderSwitch = (gender: number) => {
    switch (gender) {
      case 0:
        return { value: 0, label: "Mężczyzna" };
      case 1:
        return { value: 1, label: "Kobieta" };

      default:
        return { value: gender, label: "Inna" };
    }
  };

  const getAllCountries = async () => {
    try {
      const resp = await playerProfileServices.getAllCountries();

      const countriesArray: any = [];

      const convertedObiect = Object.values(resp);

      convertedObiect.map((country, index) => {
        return countriesArray.push({
          label: `${country.FullName}`,
          value: country.FlagValue,
        });
      });

      //@ts-ignore
      setCountries(countriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trainerProfileServices
      .getSingleTrainerProfile(id)
      .then((playerProfileData) => {
        setTrainerProfile(playerProfileData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  useEffect(() => {
    getAllCountries();
  }, []);

  if (!trainerProfile) {
    return null;
  }

  const initValues = {
    FirstName: trainerProfile.FirstName,
    LastName: trainerProfile.LastName,
    PhoneNumber: trainerProfile.Contact.PhoneNumber,
    Email: trainerProfile.Contact.Email,
    LicenseId: trainerProfile.LicenseId,
    Description: trainerProfile.Description,
    City: trainerProfile.Address.City,
    Region: trainerProfile.Address.Region,
    BuildingNumber: trainerProfile.Address.BuildingNumber,
    FlatNumber: trainerProfile.Address.FlatNumber,
    PostCode: trainerProfile.Address.PostCode,
    Street: trainerProfile.Address.Street,
  };

  const handleSubmit = async (values: typeof initValues) => {
    try {
      const editedUser = {
        DisciplineId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        Id: id,
        DeletePhoto: base64 ? true : false,
        AcceptedPrivatePolicyAndRegulation: true,
        InformationClausule: true,
        LaunchTask: true,
        MarketingDataProcessing: true,
        MarketingDataRecieving: true,
        Country: country?.value,
        ...values,
      };
      //@ts-ignore
      await trainerProfileServices.editTrainerProfile(editedUser);
      toast.success(`Edytowano profil trenera!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer
      title="Edycja profilu trenera"
      path={`/trainer-profiles/detail/${id}`}
    >
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={editPlayerProfileValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label={"Zdjęcie"}>
              <ImageField
                name="PhotoFile"
                className="mx-auto md:mx-0 mb-8"
                //  @ts-ignore
                imgSrc={trainerProfile.FtpPhotoFilePath}
                // @ts-ignore
                base64={base64}
                setBase64={setBase64}
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              {/* <SelectProfiles
                name="UserId"
                items={users}
                label="Użytkownik"
                selectedItem={selectedUser}
                setSelectedItem={setSelectedUser}
                // defaultValue={values.profile}
              /> */}

              <TextField name="FirstName" label="Imię" />
              <TextField name="LastName" label="Nazwisko" />
              <TextField name="Email" label="Adres e-mail" />
              <MaskedField
                mask={Mask.Phone}
                name="PhoneNumber"
                label="Numer telefonu"
              />
              <TextField name="LicenseId" label="Id licencji" />
              <TextField name="Description" label="Opis" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Adres">
              <SelectProfiles
                name="Country"
                items={countries}
                label="Kraj"
                selectedItem={country}
                setSelectedItem={setCountry}
                defaultValue={trainerProfile.Address.Country}
              />
              {/* <TextField name="Country" label="Kraj" /> */}
              <TextField name="City" label="Miasto" />
              <TextField name="Region" label="Województwo" />
              <TextField name="PostCode" label="Kod pocztowy" />
              <TextField name="Street" label="Ulica" />
              <TextField name="BuildingNumber" label="Numer budynku" />
              <TextField name="FlatNumber" label="Numer mieszkania" />
            </FormSection>

            <SubmitButton
              isSubmitting={isSubmitting}
              type="submit"
              className="w-80"
            >
              Zapisz
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </ContentContainer>
  );
};

export default EditTrainerProfiles;
