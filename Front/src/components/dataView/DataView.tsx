import React, { ChangeEvent, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { RootState } from '../../store/store';
import { DataViewMode, DataViewType } from '../../types/globalTypes';
import Button from '../common/buttons/basicButton/Button';
import InputSearch from '../common/inputs/searchInput/InputSearch';
import ToggleDataViewMode from '../common/toggleDataView/ToggleDataViewMode';
import DataListView from './DataListView';
import DataTableView from './DataTableView';

interface IDataViewProps {
  dataService: any;
  viewType: DataViewType;
  TableViewComponent: any;
  ListViewComponent: any;
}

const DataView: React.FC<IDataViewProps> = ({ dataService, viewType, TableViewComponent, ListViewComponent }) => {
  const viewMode = useSelector((state: RootState) => state.ui.dataViewModes[viewType]);
  const [queryString, setQueryString] = useState('');
  const { items, loading, containerRef, lastItemRef } = useInfiniteScroll<any>(dataService.getAll, queryString);

  const { push } = useHistory();

  const handleAddLicensor = () => {
    push('/licensors/add');
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value);
  };

  const renderViewComponent = () => {
    switch (viewMode) {
      case DataViewMode.table:
        return (
          <TableViewComponent
            items={items}
            containerRef={containerRef}
            isDataLoading={loading}
            lastItemRef={lastItemRef}
          />
        );
      case DataViewMode.tiles:
        return (
          <ListViewComponent
            items={items}
            containerRef={containerRef}
            isDataLoading={loading}
            lastItemRef={lastItemRef}
          />
        );
      default:
        return null;
    }
  };

  // const renderViewComponent = () => {
  //   switch (viewMode) {
  //     case DataViewMode.table:
  //       return <DataTableView />;
  //     case DataViewMode.tiles:
  //       return <DataListView tileComponent={} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      <div className='flex items-center justify-between py-36 px-24'>
        <InputSearch className='w-full xl:w-72' placeholder='Szukaj...' name='search' onChange={handleSearch} />
        <span>
          <Button onClick={handleAddLicensor} className='px-24 xl:order-2'>
            Dodaj nowego artystę
          </Button>
          <ToggleDataViewMode viewType={DataViewType['licensors']} />
        </span>
      </div>
      {renderViewComponent()}
    </>
  );
};

export default DataView;
