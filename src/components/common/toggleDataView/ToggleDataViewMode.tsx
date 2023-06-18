import cs from 'classnames';

import { DataViewMode, DataViewType } from '../../../types/globalTypes';
import Button from '../buttons/basicButton/Button';

import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataViewMode } from '../../../store/actions/ui';

import { ReactComponent as ListIco } from '../../../assets/icons/listViewIco.svg';
import { ReactComponent as TilesIco } from '../../../assets/icons/tileViewIco.svg';
import { ButtonVariant } from '../buttons/buttonTypes';

interface IToggleDataViewModeProps {
  viewType: DataViewType;
}

const ToggleDataViewMode: React.FC<IToggleDataViewModeProps> = ({ viewType }) => {
  const viewMode = useSelector((state: RootState) => state.ui.dataViewModes[viewType]);
  const dispatch = useDispatch();

  const handleViewToggle = () => {
    const newViewMode = viewMode === DataViewMode.table ? DataViewMode.tiles : DataViewMode.table;
    dispatch(changeDataViewMode(viewType, newViewMode));
  };

  const buttonClass = cs('w-7 h-7 rounded-sm xl:order-2 z-10 transform opacity-100 p-4', {
    '-translate-x-1/2': viewMode === DataViewMode.table,
    'translate-x-1/2': viewMode === DataViewMode.tiles,
  });

  return (
    <div onClick={handleViewToggle} className='relative w-16 grid place-items-center cursor-pointer'>
      <Button className={buttonClass} variant={ButtonVariant.Submit} title='Zmień widok'>
        {viewMode === DataViewMode.table ? <ListIco /> : <TilesIco />}
      </Button>
      <span className='absolute h-1 rounded-full top-1/2 w-full bg-black'></span>
    </div>
  );
};

export default ToggleDataViewMode;
