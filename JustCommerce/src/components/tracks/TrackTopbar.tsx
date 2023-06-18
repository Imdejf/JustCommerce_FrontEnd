import { ChangeEvent } from 'react';
import { useHistory } from 'react-router';

import Button from '../common/buttons/basicButton/Button';
import FilterButton from '../common/buttons/filterButton/FilterButton';
import InputSearch from '../common/inputs/searchInput/InputSearch';
import ToggleDataViewMode from '../common/toggleDataView/ToggleDataViewMode';

import { ButtonVariant } from '../common/buttons/buttonTypes';
import { DataViewType } from '../../types/globalTypes';

interface ITracksTopbarProps {
  handleQueryChange: (value: string) => void;
}

const TracksTopbar: React.FC<ITracksTopbarProps> = ({ handleQueryChange }) => {
  const { push } = useHistory();

  const handleAddTrack = () => {
    push('/tracks/add');
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(e.target.value);
  };
  return (
    <div className='flex flex-wrap items-center justify-end gap-x-6 gap-y-2 '>
      <InputSearch className='w-full md:w-36 xl:w-72' placeholder='Szukaj...' name='search' onChange={handleSearch} />
      <ToggleDataViewMode viewType={DataViewType.tracks} />
      <FilterButton />
      <Button onClick={handleAddTrack} className='px-24 xl:order-2' variant={ButtonVariant.Submit}>
        Dodaj utwór
      </Button>
    </div>
  );
};

export default TracksTopbar;
