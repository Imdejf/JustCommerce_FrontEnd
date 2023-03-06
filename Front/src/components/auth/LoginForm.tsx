import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SubmitButton from "../common/buttons/submitButton/SubmitButton";
import TextField from "../common/inputs/textInput/TextField";

import { signIn } from "../../store/actions/auth";
import { loginInitValues, loginValidationSchema } from "./authHelpers";

export type Values = {
  Email: string;
  Password: string;
};

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values: Values) => {
    try {
      await dispatch(signIn(values));
      toast.success("Poprawnie zalogowano");
    } catch (errors: any) {
      toast.error(`Błąd: ${errors.join(" | ")}`);
    }
  };

  return (
    <div className="flex flex-1 xl:flex-2 flex-col md:justify-center lg:h-96 mt-8 text-center px-24">
      <div className="text-xxl text-gray opacity-70 mt-4 mb-8">Logowanie</div>
      <Formik
        initialValues={loginInitValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <fieldset
              className="flex flex-col gap-2 mx-auto max-w-sm"
              disabled={isSubmitting}
            >
              <TextField
                name="Email"
                label="Login"
                placeholder="Wprowadź adres mailowy"
              />
              <TextField
                name="Password"
                label="Hasło"
                placeholder="Wprowadź hasło"
                type="password"
              />
            </fieldset>
            <SubmitButton className="mx-auto mt-6" isSubmitting={isSubmitting}>
              Zaloguj
            </SubmitButton>
          </Form>
        )}
      </Formik>

      <div className="text-sm opacity-50 mx-auto my-3 underline">
        <Link to="/remindPassword">Nie pamiętasz hasła?</Link>
      </div>
    </div>
  );
};

export default AuthForm;
