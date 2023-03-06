import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

import ContentContainer from "../layout/ContentContainer";
import FormSection from "../common/forms/FormSection";
import MaskedField from "../common/inputs/maskedInput/MaskedField";
import SubmitButton from "../common/buttons/submitButton/SubmitButton";
import TextField from "../common/inputs/textInput/TextField";

import usersService from "../../services/usersService";
import { IUserManagement, UserInterface } from "../../types/userTypes";

import { Mask } from "../../utils/constants/constants";
import { showServerErrors } from "../../utils/errorsUtils";

const EditUser: React.FC = () => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();

  useEffect(() => {
    usersService
      .getUser(id)
      .then((user) => {
        setUser(user);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  if (!user) {
    return null;
  }

  const initValues = {
    FirstName: user.FirstName,
    LastName: user.LastName,
    Position: user.Position,
    UserName: user.UserName,
    ProfileId: user.Id,
    Email: user.Email,
    PhoneNumber: user.PhoneNumber,
    Nickname: user.Nickname,
  };

  const handleSubmit = async (values: typeof initValues) => {
    try {
      const editedUser = {
        UserId: id,
        Type: 0,
        FtpPhotoFilePath: "/",
        ...values,
      };
      //@ts-ignore
      await usersService.edit(editedUser);
      toast.success(`Użytkownik zaktualizowany`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title="Edycja pracownika" path={`/users/detail/${id}`}>
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <TextField name="FirstName" label="Imię" />
              <TextField name="LastName" label="Nazwisko" />
              <TextField name="Email" label="Adres e-mail" />
              <TextField name="Nickname" label="Nick" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Logowanie">
              {/* <TextField
                name="UserName"
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

export default EditUser;
