import { useHistory } from 'react-router';

import Button from '../common/buttons/basicButton/Button';

import { ButtonVariant } from '../common/buttons/buttonTypes';

const ConditionsTopbar = () => {
  const { push } = useHistory();

  const handleAddCondition = () => {
    push('/settlements/conditions/add');
  };

  return (
    <div className='flex flex-wrap items-center justify-end gap-x-6 gap-y-2 '>
      <Button onClick={handleAddCondition} className='px-24 xl:order-2' variant={ButtonVariant.Submit}>
        Dodaj szablon
      </Button>
    </div>
  );
};

export default ConditionsTopbar;
