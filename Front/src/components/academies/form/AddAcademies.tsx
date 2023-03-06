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
import academiesServices from "services/academiesServices";

const AddAcademies: React.FC = () => {
  const [base64, setBase64] = useState("");
  const [date, setDate] = useState();
  const [type, setType] =
    useState<{ value: number; label: string } | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<{ value: number; label: string } | null>(null);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const [types, setTypes] = useState<{ value: number; label: string }[]>([]);
  const { goBack, push } = useHistory();
  const [country, setCountry] =
    useState<{ value: number; label: string } | null>(null);

  const [countries, setCountries] = useState<
    { value: number; label: string }[]
  >([]);

  const handleSubmit = async (values: IRegisterDTO) => {
    if (!type) return toast.error("Wybierz Typ!");
    if (!country) return toast.error("Wybierz Kraj!");
    if (!base64) return toast.error("Wybierz zdjęcie!");
    try {
      await academiesServices.addAcademy(values, type.value, country.value);
      toast.success("Dodano nową akademie!");
      push("/academies");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const getAllTypes = async () => {
    try {
      setTypes([
        {
          label: "Akademia",
          value: 0,
        },
        {
          label: "Klub",
          value: 1,
        },
        {
          label: "Reprezentacja",
          value: 2,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTypes();
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
    <ContentContainer title="Dodaj akademie" path="/academies">
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
              <TextField name="Name" label="Nazwa" />

              <SelectProfiles
                name="Type"
                items={types}
                label="Typ"
                selectedItem={type}
                setSelectedItem={setType}
                // defaultValue={values.profile}
              />

              <TextField name="NIP" label="NIP" />
              <TextField name="Email" label="Adres e-mail" />
              <MaskedField
                mask={Mask.Phone}
                name="PhoneNumber"
                label="Numer telefonu"
              />
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

export default AddAcademies;
