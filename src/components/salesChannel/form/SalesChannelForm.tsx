import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import FormSection from 'components/common/forms/FormSection';
import SelectInput from 'components/common/inputs/select/Select';
import SubmitButton from 'components/common/buttons/submitButton/SubmitButton';
import TextField from 'components/common/inputs/textInput/TextField';

import { ISalesChannelRequest } from 'types/salesChannelTypes';
import { isActiveOptions } from 'utils/baseUtils';
import { salesChannelValidations } from 'utils/salesChannelUtils';

import GroupSelect from './inputs/GroupSelect';
import CategorySelect from './inputs/CategorySelect';
import ProvidersSelect from './inputs/ProvidersSelect';
import DeleteButton from 'components/common/buttons/deleteButton/DeleteButton';

interface IEditSalesChannelProps {
  salesChannel: ISalesChannelRequest;
  isEdit: boolean;
  onSubmit: (values: ISalesChannelRequest) => void;
}

const SalesChannelForm: React.FC<IEditSalesChannelProps> = ({ isEdit, salesChannel, onSubmit }) => {
  const permissions = useSelector((state: RootState) => state.userPermissions);

  const handleSubmit = async (values: ISalesChannelRequest) => {
    await onSubmit(values);
  };

  if (!permissions) {
    return null;
  }

  return (
    <Formik
      initialValues={{ ...salesChannel }}
      validationSchema={salesChannelValidations}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ errors, isSubmitting, initialValues, values, setFieldValue }) => (
        <Form className='flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30'>
          <FormSection isDisabled={isSubmitting} label='Nazwa'>
            <TextField name='name' label='Nazwa' helperText={errors.name} />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label='Grupa'>
            <GroupSelect />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label='Kategoria'>
            <CategorySelect selectedGroup={values.group} />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label='Dostawca'>
            <ProvidersSelect />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label='Status'>
            <SelectInput
              name='isActive'
              label='Status'
              defaultValue={initialValues.isActive}
              items={isActiveOptions}
              onChange={({ value }) => {
                setFieldValue('isActive', value);
              }}
            />
          </FormSection>

          <div className='flex gap-x-2'>
            <SubmitButton isSubmitting={isSubmitting} className='mt-6 '>
              Zapisz
            </SubmitButton>

            {isEdit && (
              <DeleteButton isSubmitting={isSubmitting} disabled={!permissions.Artist.Delete}>
                Usuń
              </DeleteButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SalesChannelForm;
