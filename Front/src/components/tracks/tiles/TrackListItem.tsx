import { Link } from "react-router-dom";

import Placeholder from "assets/images/placeholder.png";

import { TrackLabels, ITrack } from "../utils/trackTypes";

interface ITrackListItemProps {
  track: ITrack;
  innerRef?: any;
}

const TrackListItem: React.FC<ITrackListItemProps> = ({ track, innerRef }) => {
  return (
    <Link
      to={`/tracks/detail/${track.id}`}
      ref={innerRef}
      className="flex flex-col rounded bg-opacity-50 bg-white py-12 px-18 text-sm leading-relaxed hover:bg-opacity-90"
    >
      <div className="text-base font-medium opacity-80 p-4">{track.title}</div>

      <div className="flex py-4 px-12">
        <div className="flex flex-col flex-grow ">
          <div className="tileInfo">
            <div className="my-1">
              <span className="tileInfo__label">{TrackLabels.title}</span>
              <span>{track.title}</span>
            </div>

            <div className="my-1">
              {/* <span className='tileInfo__label'>{TrackLabels.lastName}</span>
              <span>{track.contactLastName}</span> */}
            </div>
          </div>
        </div>

        <div className="w-28 h-28 self-end shadow-md">
          <img src={Placeholder} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default TrackListItem;
