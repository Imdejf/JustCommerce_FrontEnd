import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import SubmitButton from '../common/buttons/submitButton/SubmitButton';
import TextInput from '../common/inputs/textInput/TextInput';

import { changePassword } from '../../store/actions/currentUser';
import { changePasswordInitValues, changePasswordValidationSchema } from './profileUtils';

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values: typeof changePasswordInitValues) => {
    try {
      await dispatch(changePassword(values));
      toast.success('Hasło zostało zmienione');
    } catch (errors: any) {
      toast.error('Błąd: ' + errors.join(' | '));
    }
  };

  return (
    <Formik
      initialValues={changePasswordInitValues}
      onSubmit={handleSubmit}
      validationSchema={changePasswordValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form className='m-12'>
          <fieldset className='flex flex-col gap-2 max-w-md mx-auto' disabled={isSubmitting}>
            <TextInput
              className='py-8 px-18'
              name='currentPassword'
              label='Aktualne hasło'
              placeholder='Wprowadź aktualne hasło'
              type='password'
            />
            <TextInput
              className='py-8 px-18'
              name='newPassword'
              label='Nowe hasło'
              placeholder='Wprowadź nowe hasło'
              type='password'
            />
            <TextInput
              className='py-8 px-18'
              name='newPasswordCopy'
              label='Ponów hasło'
              placeholder='Powtórz nowe hasło'
              type='password'
            />
          </fieldset>

          <SubmitButton isSubmitting={isSubmitting} type='submit' className='mx-auto mt-8'>
            Zapisz nowe hasło
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
