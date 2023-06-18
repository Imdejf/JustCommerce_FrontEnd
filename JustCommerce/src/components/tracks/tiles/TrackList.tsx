import { ITrack } from '../utils/trackTypes';
import TrackListItem from './TrackListItem';

interface ITracksListProps {
  tracks: Array<ITrack>;
  isDataLoading: boolean;
  lastItemRef: any;
  containerRef: any;
}

const TracksList: React.FC<ITracksListProps> = ({ tracks, isDataLoading, lastItemRef, containerRef }) => {
  return (
    <div
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}
      className='flex flex-col md:grid gap-8 px-8 md:px-36 md:py-24'
      ref={containerRef}
    >
      {tracks.map((track, index) => {
        const isLast = index === tracks.length - 1;
        return isLast ? (
          <TrackListItem key={track.id} track={track} innerRef={lastItemRef} />
        ) : (
          <TrackListItem key={track.id} track={track} />
        );
      })}
      <div>{isDataLoading && 'Loading...'} </div>
    </div>
  );
};

export default TracksList;
