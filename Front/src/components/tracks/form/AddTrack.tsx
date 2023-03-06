import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ContentContainer from 'components/layout/ContentContainer';
import TrackForm from './TrackForm';

import tracksService from 'services/trackServices';
import { getNotEmptyFields } from 'utils/objectUtils';
import { ITrack, TrackRequest } from 'components/tracks/utils/trackTypes';
import { showServerErrors } from 'utils/errorsUtils';

const AddTrack: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const newTrack: ITrack = {
    id: '',
    title: '',
    version: '',
    genre: 0,
    isrc: '',
    explicitContent: 0,
    audioLanguage: 0,
    metadataLanguage: 0,
    pLine: '',
    cLine: '',
    lyrics: '',
    isInstrumental: true,
    releaseDate: '',
    duration: 3,
    artists: [],
    status: 0,
    audioFile: '',
  };

  const handleSubmit = async (trackData: TrackRequest) => {
    try {
      const newTrack = getNotEmptyFields(trackData);
      await tracksService.add(newTrack);
      toast.success(t('track.addedNewTrack'));
      push('/tracks');
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title={t('track.add')}>
      <TrackForm track={newTrack} onSubmit={handleSubmit} isEdit={false} />
    </ContentContainer>
  );
};

export default AddTrack;
