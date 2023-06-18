// @ts-nocheck
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
import { registerInitValues, registerValidationSchema } from "../authHelpers";
import { Mask } from "../../../utils/constants/constants";
import FormSection from "../../common/forms/FormSection";
import authService from "../../../services/authServices";
import permissionsServices from "services/permissionsServices";
import { getNotEmptyFields } from "../../../utils/objectUtils";
import { showServerErrors } from "../../../utils/errorsUtils";
import { useHistory } from "react-router-dom";
import { ISelectOption } from "components/common/inputs/inputTypes";

const RegisterForm: React.FC = () => {
  const [selectedItem, setSelectedItem] =
    useState<{ value: number; label: string } | null>(null);
  const { goBack } = useHistory();
  const [profiles, setProfiles] = useState([]);
  const handleSubmit = async (values: IRegisterDTO) => {
    if (!selectedItem) return toast.error("Wybierz profil!");
    try {
      await authService.register(values, selectedItem);
      toast.success("Dodano nowego pracownika");
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const getAllProfiles = async () => {
    try {
      const resp = await permissionsServices.getAllProfiles();

      const profilesArray = [];

      const convertedObiect = Object.values(resp);

      convertedObiect.map((single, index) => {
        if (index === 2) {
          return;
        } else {
          return profilesArray.push({
            label: single.FlagName,
            value: single.FlagValue,
          });
        }
      });

      setProfiles(profilesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <ContentContainer title="Dodaj nowego pracownika" path="/users">
      <Formik
        initialValues={registerInitValues}
        onSubmit={handleSubmit}
        validationSchema={registerValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label="Profil">
              <SelectProfiles
                name="Profile"
                items={profiles}
                label="Profil"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                // defaultValue={values.profile}
              />
            </FormSection>
            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <TextField name="FirstName" label="Imię" />
              <TextField name="LastName" label="Nazwisko" />
              <TextField name="Email" label="Adres e-mail" />
              <TextField name="Nickname" label="Nick" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Logowanie">
              {/* <TextField
                name="userName"
                label="Login"
                placeholder="Wprowadź login"
                type="text"
              /> */}
              <TextField name="Password" label="Hasło" type="password" />
              <TextField
                name="ReplyPassword"
                label="Potwierdź hasło"
                type="password"
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Dodatkowe">
              <MaskedField
                mask={Mask.Phone}
                name="PhoneNumber"
                label="Numer telefonu"
              />
              <TextField name="Position" label="Stanowisko" type="text" />
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

export default RegisterForm;
