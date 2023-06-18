import cs from 'classnames';
import { useTranslation } from 'react-i18next';

import { DragStatus } from '../inputTypes';

interface IDragOverlayProps {
  dragStatus: DragStatus;
}

const DragOverlay: React.FC<IDragOverlayProps> = ({ dragStatus }) => {
  const { t } = useTranslation();

  const className = cs({
    hidden: dragStatus === DragStatus.none,
    flex: dragStatus === DragStatus.over,
  });
  return (
    <div
      className={`absolute inset-0 flex-col gap-2 items-center justify-center  
    bg-white z-10 place-items-center pointer-events-none ${className}`}
    >
      <span className='material-icons-outlined opacity-60 text-6xl transform rotate-180'>publish</span>
      <span className='opacity-80 capitalize-first'>{`${t('common.drop')} ${t('common.here')}`}</span>
    </div>
  );
};

export default DragOverlay;
