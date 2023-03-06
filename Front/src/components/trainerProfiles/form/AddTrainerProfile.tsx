import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import ContentContainer from "../../layout/ContentContainer";
import MaskedField from "../../common/inputs/maskedInput/MaskedField";
import SelectProfiles from "../../common/inputs/select/SelectProfiles";
import SubmitButton from "../../common/buttons/submitButton/SubmitButton";
import TextField from "../../common/inputs/textInput/TextField";

import { IRegisterDTO } from "../../../types/userTypes";
import { useProfiles } from "../../../hooks/useProfiles";
import {
  addPlayerProfileInitValues,
  addPlayerProfileValidationSchema,
} from "./authHelpers";
import { Mask } from "../../../utils/constants/constants";
import FormSection from "../../common/forms/FormSection";
import authService from "../../../services/authServices";
import permissionsServices from "services/permissionsServices";
import { getNotEmptyFields } from "../../../utils/objectUtils";
import { showServerErrors } from "../../../utils/errorsUtils";
import { useHistory } from "react-router-dom";
import { ISelectOption } from "components/common/inputs/inputTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import playerProfileServices from "services/playerProfileServices";
import artistServices from "services/artistServices";
import ProfileDatePicker from "components/common/inputs/Datepicker/ProfileDatePicker";
import TextInput from "components/common/inputs/textInput/TextInput";
import trainerProfileServices from "services/trainerProfileServices";

const AddTrainerProfile: React.FC = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [base64, setBase64] = useState("");
  const [date, setDate] = useState();
  const [gender, setGender] =
    useState<{ value: number; label: string } | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<{ value: number; label: string } | null>(null);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const [genders, setGenders] = useState<{ value: number; label: string }[]>(
    [],
  );
  const [country, setCountry] =
    useState<{ value: number; label: string } | null>(null);

  const [countries, setCountries] = useState<
    { value: number; label: string }[]
  >([]);
  const { goBack } = useHistory();

  const handleChange = () => {
    setCheckbox((prev) => !prev);
  };

  const handleSubmit = async (values: IRegisterDTO) => {
    if (!base64) return toast.error("Wybierz zdjęcie!");
    if (!selectedUser) return toast.error("Wybierz użytkownika!");
    if (!country) return toast.error("Wybierz Kraj!");
    if (!checkbox) return toast.error("Musisz zaakceptować relugamin!");
    try {
      await trainerProfileServices.addTrainerProfile(
        values,
        selectedUser?.value,
        country?.value,
      );
      toast.success("Dodano nowy profil trenera!");
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const getAllGenders = async () => {
    try {
      setGenders([
        {
          label: "Mężczyzna",
          value: 0,
        },
        {
          label: "Kobieta",
          value: 1,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGenders();
  }, []);

  const getAllUsers = async () => {
    try {
      const resp = await artistServices.getAll({
        pageNumber: 1,
        pageSize: 50,
        searchString: "",
      });

      //@ts-ignore
      const profilesArray = [];
      //@ts-ignore
      const convertedObiect = Object.values(resp.Items);

      convertedObiect.map((single, index) => {
        return profilesArray.push({
    
        });
      });

      //@ts-ignore
      setUsers(profilesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
    getAllCountries();
  }, []);

  return (
    <ContentContainer title="Dodaj profil trenera" path="/trainer-profiles">
      <Formik
        // @ts-ignore
        initialValues={addPlayerProfileInitValues}
        onSubmit={handleSubmit}
        validationSchema={addPlayerProfileValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label={"Zdjęcie"}>
              <ImageField
                name="PhotoFile"
                className="mx-auto md:mx-0 mb-8"
                //  @ts-ignore
                imgSrc={values.image}
                // @ts-ignore
                base64={base64}
                setBase64={setBase64}
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <SelectProfiles
                name="UserId"
                items={users}
                label="Użytkownik"
                selectedItem={selectedUser}
                setSelectedItem={setSelectedUser}
                // defaultValue={values.profile}
              />

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
                // defaultValue={values.profile}
              />
              {/* <TextField name="Country" label="Kraj" /> */}
              <TextField name="City" label="Miasto" />
              <TextField name="Region" label="Województwo" />
              <TextField name="PostCode" label="Kod pocztowy" />
              <TextField name="Street" label="Ulica" />
              <TextField name="BuildingNumber" label="Numer budynku" />
              <TextField name="FlatNumber" label="Numer mieszkania" />
            </FormSection>

            <div>
              <label
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  onChange={handleChange}
                  style={{ width: "15px", height: "15px" }}
                />
                <p style={{ fontSize: "14px", userSelect: "none" }}>
                  Oświadczam że zapoznałam/zapoznałem się z Regulaminem oraz
                  Polityką prywatności i akceptuje ich postanowienia
                </p>
              </label>
            </div>

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

export default AddTrainerProfile;
