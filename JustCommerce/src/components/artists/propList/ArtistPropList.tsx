import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/buttons/basicButton/Button';
import SelectInput from 'components/common/inputs/select/Select';
import TextInput from 'components/common/inputs/textInput/TextInput';
import { ISelectOption } from 'components/common/inputs/inputTypes';

import { ArtistPropItem } from 'types/artistTypes';
import { getArtistRolesOptions } from 'utils/artistUtils';
import ErrorMessage from 'components/common/inputs/ErrorMessage';

interface Props {
  dataService: { getArtists: () => Promise<ArtistPropItem[]> };
  defaultValue?: ArtistPropItem[];
  errorMessage?: string;
  onChange: (selectedArtists: ArtistPropItem[]) => void;
}

const roleOptions = getArtistRolesOptions();

const ArtistPropList = ({ dataService, defaultValue, errorMessage, onChange }: Props) => {
  const [selectedArtists, setSelectedArtists] = useState<ArtistPropItem[]>(defaultValue || []);
  const [artists, setArtists] = useState<ArtistPropItem[]>([]);

  const touched = useRef(false);
  const { t } = useTranslation();

  const artistOptions = useMemo(() => artists.map((artist) => ({ label: artist.name, value: artist.id })), [artists]);

  const handleSelectArtist = ({ value }: ISelectOption) => {
    const newArtist = artists.find((artist) => artist.id === value);
    if (!newArtist) {
      return;
    }
    setArtists((prev) => prev.filter((artist) => artist.id !== value));
    setSelectedArtists((prev) => [...prev, newArtist]);
    touched.current = true;
  };

  const handleRoleChange = useCallback((artistId: string, role: number) => {
    setSelectedArtists((prev) => prev.map((artist) => (artist.id === artistId ? { ...artist, role } : artist)));
    touched.current = true;
  }, []);

  const handleRemoveArtist = (artist: ArtistPropItem) => {
    setSelectedArtists((prev) => prev.filter((selectedArtist) => selectedArtist.id !== artist.id));
    setArtists((prev) => [...prev, artist]);
    touched.current = true;
  };

  useEffect(() => {
    if (onChange && touched.current) {
      onChange(selectedArtists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArtists]);

  const fetchArtists = useCallback(async () => {
    const newArtists = await dataService.getArtists();
    setArtists(newArtists);
  }, [dataService]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='mb-3'>
        <SelectInput
          name='explicitContent'
          label={t('labels.artists')}
          items={artistOptions}
          onChange={handleSelectArtist}
          isSearchable
          showErrors={false}
          onlyPickValue
        />
        {errorMessage && <ErrorMessage show={!!errorMessage} message={errorMessage} />}
      </div>
      {selectedArtists.map((artist) => (
        <div key={artist.id} className='flex gap-2'>
          <TextInput name={`artist${artist.id}`} value={artist.name} disabled showErrors={false} />
          <SelectInput
            name={`artist${artist.id}.role`}
            label={t('labels.role')}
            items={roleOptions}
            optionClassName='capitalize-first'
            isSearchable
            showErrors={false}
            defaultValue={artist.role}
            onChange={({ value }) => handleRoleChange(artist.id, value)}
          />
          <Button
            className='h-9 w-9 p-0 m-auto border-red opacity-50 hover:opacity-80'
            onClick={() => handleRemoveArtist(artist)}
          >
            <span className='material-icons-outlined text-lg text-red'>delete</span>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ArtistPropList;
