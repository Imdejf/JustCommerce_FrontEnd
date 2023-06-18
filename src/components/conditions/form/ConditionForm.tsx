import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { RootState } from 'store/store';

import DeleteButton from 'components/common/buttons/deleteButton/DeleteButton';
import FormSection from 'components/common/forms/FormSection';
import SelectInput from 'components/common/inputs/select/Select';
import SubmitButton from 'components/common/buttons/submitButton/SubmitButton';
import TextField from 'components/common/inputs/textInput/TextField';

import conditionsService from 'services/conditionsServices';
import { conditionValidations, templateToRequestObject } from 'utils/conditionsUtils';
import { ConditionTemplate, ICondition } from 'types/conditionTypes';

import { isActiveOptions } from 'utils/baseUtils';
import { showServerErrors } from 'utils/errorsUtils';

import GroupPanel from './GroupPanel/GroupPanel';

interface IEditConditionProps {
  template: ConditionTemplate;
  isEdit?: boolean;
  onSubmit: (values: ICondition) => void;
}

const ConditionForm: React.FC<IEditConditionProps> = ({ template, isEdit, onSubmit }) => {
  const permissions = useSelector((state: RootState) => state.userPermissions);

  const { goBack } = useHistory();

  if (!permissions || !template) {
    return null;
  }

  const handleSubmit = async (values: ConditionTemplate) => {
    const requestData = templateToRequestObject(values);
    onSubmit(requestData);
  };

  const handleDelete = async () => {
    try {
      await conditionsService.remove(template.id);
      toast.success('Usunięto wydawcę');
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={template}
      validationSchema={conditionValidations}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ errors, isSubmitting, initialValues, setFieldValue }) => (
        <Form className='flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30'>
          <FormSection isDisabled={isSubmitting} label='Ogólne'>
            <TextField name='name' label='Nazwa' helperText={errors.name} />
            <TextField name='comments' label='Komentarz' />
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

          <GroupPanel isSubmitting={isSubmitting} groups={template.conditionsGroups} />

          <div className='flex gap-x-2'>
            <SubmitButton isSubmitting={isSubmitting} className='mt-6 '>
              Zapisz
            </SubmitButton>

            {isEdit && (
              <DeleteButton isSubmitting={isSubmitting} disabled={!permissions.Artist.Delete} onClick={handleDelete}>
                Usuń
              </DeleteButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ConditionForm;
