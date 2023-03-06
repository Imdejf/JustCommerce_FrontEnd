import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../../store/store';

import Button from '../../common/buttons/basicButton/Button';

import { ButtonVariant } from '../../common/buttons/buttonTypes';
import { ConditionTemplate } from '../../../types/conditionTypes';
import StatusInfo from 'components/statusInfo/StatusInfo';

interface IConditionDetailTopbarProps {
  condition: ConditionTemplate;
}

const ConditionDetailTopbar: React.FC<IConditionDetailTopbarProps> = ({ condition }) => {
  const { push } = useHistory();
  const permissions = useSelector((state: RootState) => state.userPermissions);

  if (!permissions) {
    return null;
  }

  const handleEdit = () => {
    push(`/settlements/conditions/edit/${condition.id}`);
  };
  return (
    <div className='flex justify-between px-8 text-sm'>
      <StatusInfo className='px-8 md:px-12' status={`${condition.isActive}`} />

      <div className='flex gap-4'>
        <Button
          onClick={handleEdit}
          //   disabled={!permissions.Condition.Edit.checked}
          variant={ButtonVariant.Submit}
          className='flex-1 md:flex-grow-0 py-8 px-18'
        >
          Edytuj
        </Button>
      </div>
    </div>
  );
};

export default ConditionDetailTopbar;
