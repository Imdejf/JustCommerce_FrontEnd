import { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import ContentContainer from 'components/layout/ContentContainer';

import conditionsService from 'services/conditionsServices';
import { ConditionTemplate, ICondition } from 'types/conditionTypes';
import { showServerErrors } from 'utils/errorsUtils';

import ConditionForm from './ConditionForm';

const EditCondition = () => {
  const [template, setTemplate] = useState<ConditionTemplate | null>(null);
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();

  const fetchTemplate = useCallback(async () => {
    const res = await conditionsService.get(id);
    setTemplate(res);
  }, [id]);

  useEffect(() => {
    fetchTemplate();
  }, [fetchTemplate]);

  const handleSubmit = async (values: ICondition) => {
    try {
      await conditionsService.edit(values);
      toast.success(`Poprawnie edytowano szblon!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title='Edytuj szablon'>
      {template && <ConditionForm template={template} onSubmit={handleSubmit} isEdit />}
    </ContentContainer>
  );
};

export default EditCondition;
