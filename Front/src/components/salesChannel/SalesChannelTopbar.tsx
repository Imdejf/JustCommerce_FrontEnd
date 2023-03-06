import { ChangeEvent } from 'react';
import { useHistory } from 'react-router';

import Button from '../common/buttons/basicButton/Button';
import FilterButton from '../common/buttons/filterButton/FilterButton';
import InputSearch from '../common/inputs/searchInput/InputSearch';

import { ButtonVariant } from '../common/buttons/buttonTypes';

interface ISalesChannelsTopbarProps {
  handleQueryChange: (value: string) => void;
}

const SalesChannelsTopbar: React.FC<ISalesChannelsTopbarProps> = ({ handleQueryChange }) => {
  const { push } = useHistory();

  const handleAddSalesChannel = () => {
    push('/settlements/saleschannel/add');
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(e.target.value);
  };
  return (
    <div className='flex flex-wrap items-center justify-end gap-x-6 gap-y-2 '>
      <InputSearch className='w-full md:w-36 xl:w-72' placeholder='Szukaj...' name='search' onChange={handleSearch} />
      <FilterButton />
      <Button onClick={handleAddSalesChannel} className='px-24 xl:order-2' variant={ButtonVariant.Submit}>
        Dodaj kanał
      </Button>
    </div>
  );
};

export default SalesChannelsTopbar;
