import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Button from '../../common/buttons/basicButton/Button';

import { RootState } from '../../../store/store';
import { ITrack } from '../utils/trackTypes';
import { ButtonVariant } from '../../common/buttons/buttonTypes';

interface IlLcensorDetailTopbarProps {
  track: ITrack;
}

const TrackDetailTopbar: React.FC<IlLcensorDetailTopbarProps> = ({ track }) => {
  const { push } = useHistory();
  const permissions = useSelector((state: RootState) => state.userPermissions?.Tracks);

  if (!permissions) {
    return null;
  }

  const handleEdit = () => {
    push(`/tracks/edit/${track.id}`);
  };

  return (
    <div className='flex justify-end px-8 text-sm'>
      <div className='flex gap-4'>
        <Button
          onClick={handleEdit}
          disabled={!permissions.Edit}
          variant={ButtonVariant.Submit}
          className='flex-1 md:flex-grow-0 py-8 px-18'
        >
          Edytuj
        </Button>
      </div>
    </div>
  );
};

export default TrackDetailTopbar;
