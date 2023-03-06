import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

import SubmitButton from '../../common/buttons/submitButton/SubmitButton';
import TextField from '../../common/inputs/textInput/TextField';
import AuthHeader from '../LoginHeader';

import { remindPassword } from '../../../store/actions/auth';
import { forgotPasswordValidation, forgotPasswordInitValues } from '../authHelpers';

interface IForgotPasswordProps {}

const RemindPassword: React.FC<IForgotPasswordProps> = (props) => {
  const { push } = useHistory();

  const handleSubmit = async ({ email }: typeof forgotPasswordInitValues) => {
    try {
      await remindPassword(email);
      toast.success('Link został wysłany na podany e-mail.');
      push('/auth');
    } catch (errors: any) {
      toast.error(`Błąd: ${errors.join(' | ')}`);
    }
  };

  return (
    <>
      <div className='flex flex-1 xl:flex-2 flex-col items-center md:justify-center lg:h-96 mt-8 py-36  px-24'>
        <div className='text-xl sm:text-xxl text-gray opacity-70 mt-4 mb-8'>Przypomnienie hasła</div>
        <Formik
          initialValues={forgotPasswordInitValues}
          onSubmit={handleSubmit}
          validationSchema={forgotPasswordValidation}
        >
          {({ isSubmitting }) => (
            <Form>
              <fieldset className='flex flex-col gap-2 mx-2 sm:mx-12' disabled={isSubmitting}>
                <TextField
                  className='sm:max-w-sm mx-auto'
                  name='email'
                  label='E-mail'
                  placeholder='Wprowadź adres mailowy'
                />

                <div className='text-sm text-center opacity-90 mx-auto'>
                  <div>Na zarejestrowanego maila wyślemy automatycznie wygenerowane nowe hasło.</div>
                  <div>Zalecamy zmianę otrzymanego hasła na własne zaraz po zalogowaniu.</div>
                </div>
              </fieldset>
              <SubmitButton className='mt-8 mb-4 mx-auto' isSubmitting={isSubmitting}>
                Wyślij hasło
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
      <AuthHeader />
    </>
  );
};

export default RemindPassword;
