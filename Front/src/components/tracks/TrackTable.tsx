import StatusInfo from 'components/statusInfo/StatusInfo';
import { useTranslation } from 'react-i18next';
import DataTable from '../common/dataTable/DataTable';

import { ITrack, TrackStatus } from './utils/trackTypes';

interface ITrackTableProps {
  tracks: Array<ITrack>;
  containerRef: any;
  lastItemRef: any;
  isDataLoading: boolean;
}

const TrackTable: React.FC<ITrackTableProps> = ({ tracks, containerRef, isDataLoading, lastItemRef }) => {
  const { t } = useTranslation();
  const headers = [
    <div className='capitalize-first'>{t('labels.title')}</div>,
    <div className='capitalize-first'>{t('labels.artists')}</div>,
    'ISRC',
    <div className='capitalize-first'>{t('labels.status')}</div>,
  ];

  const rows = tracks.map((track) => ({
    data: { link: `/tracks/detail/${track.id}` },
    cols: [
      `${track.title}`,
      <div>
        {track.artists.map((artist) => (
          <div>{artist.name}</div>
        ))}
      </div>,
      track.isrc,
      <StatusInfo status={`${TrackStatus[track.status]}`} />,
    ],
  }));

  return (
    <DataTable
      rows={rows}
      headers={headers}
      isDataLoading={isDataLoading}
      containerRef={containerRef}
      lastItemRef={lastItemRef}
    />
  );
};

export default TrackTable;
