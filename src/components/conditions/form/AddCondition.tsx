import ContentContainer from 'components/layout/ContentContainer';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import conditionsService from 'services/conditionsServices';
import { ConditionTemplate, ICondition } from 'types/conditionTypes';
import { showServerErrors } from 'utils/errorsUtils';

import ConditionForm from './ConditionForm';

const AddCondition = () => {
  const [template, setTemplate] = useState<ConditionTemplate | null>(null);
  const { goBack } = useHistory();

  const fetchTemplate = async () => {
    const res = await conditionsService.getNewTemplate();
    setTemplate(res);
  };

  useEffect(() => {
    fetchTemplate();
  }, []);

  const handleSubmit = async (values: ICondition) => {
    try {
      await conditionsService.add({ ...values, licensorId: null, isTemplate: false });
      toast.success(`Dodano nowy szblon!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title='Dodaj szablon'>
      {template && <ConditionForm template={template} onSubmit={handleSubmit} />}
    </ContentContainer>
  );
};

export default AddCondition;
