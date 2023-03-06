import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { RootState } from "store/store";

import DatepickerField from "components/common/inputs/Datepicker/DatepickerField";
import DeleteButton from "components/common/buttons/deleteButton/DeleteButton";
import FileField from "components/common/inputs/FileInput/FileField";
import FormSection from "components/common/forms/FormSection";
import SelectInput from "components/common/inputs/select/Select";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";
import Switch from "components/common/inputs/switch/Switch";
import TextField from "components/common/inputs/textInput/TextField";

import {
  explicitContentOptions,
  ITrack,
  TrackRequest,
  trackStatusOptions,
} from "components/tracks/utils/trackTypes";

import { enumToSelectOptions } from "utils/baseUtils";
import { Genre } from "utils/constants/genres";
import { getLanguageOptions } from "utils/constants/languages";
import { parseSecondsToTime, parseTimeToSeconds } from "utils/dateUtils";
import { showServerErrors } from "utils/errorsUtils";

import tracksService from "services/trackServices";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import ArtistPropList from "components/artists/propList/ArtistPropList";
import { trackValidations } from "../utils/trackHelpers";

interface IEditTrackProps {
  track: ITrack;
  isEdit: boolean;
  onSubmit: (values: TrackRequest) => void;
}

const TrackForm: React.FC<IEditTrackProps> = ({ track, isEdit, onSubmit }) => {
  const permissions = useSelector((state: RootState) => state.userPermissions);
  const { replace } = useHistory();
  const { t } = useTranslation();

  if (!permissions) {
    return null;
  }

  const genreOptions = enumToSelectOptions(Genre);
  const lnagOptions = getLanguageOptions();

  const initialValues = {
    ...track,
    duration: parseSecondsToTime(track.duration),
    isInstrumental: { checked: track.isInstrumental },
    artists: track.artists.map((artist) => ({
      artistId: artist.id,
      artistRole: artist.role,
    })),
  };

  const handleSubmit = async ({
    artists,
    duration,
    ...values
  }: typeof initialValues) => {
    const data: TrackRequest = {
      ...values,
      duration: parseTimeToSeconds(duration),
      artists,
      isInstrumental: values.isInstrumental.checked,
    };
    await onSubmit(data);
  };

  const handleDelete = async () => {
    try {
      await tracksService.remove(track.id);
      toast.success(t("track.removed"));
      replace("/tracks");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={trackValidations}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ errors, isSubmitting, initialValues, values, setFieldValue }) => (
        <Form className="flex flex-col gap-x-6 mx-auto px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
          <FormSection isDisabled={isSubmitting} label={t("labels.basicData")}>
            <TextField
              name="title"
              label={t("labels.title")}
              placeholder={errors.title}
            />
            <TextField
              name="version"
              label={t("labels.version")}
              placeholder={errors.version}
            />
            <SelectInput
              name="genre"
              label={t("labels.genre")}
              items={genreOptions}
              defaultValue={initialValues.genre}
            />
          </FormSection>

          <FormSection isDisabled={isSubmitting}>
            <TextField name="isrc" label="ISRC" placeholder={errors.isrc} />
            <TextField name="pLine" label="(P)" placeholder={errors.pLine} />
            <TextField name="cLine" label="&copy;" placeholder={errors.cLine} />
          </FormSection>

          <FormSection
            isDisabled={isSubmitting}
            label={t("track.supplementaryData")}
          >
            <Switch
              name="isInstrumental"
              label={t("track.isInstrumental")}
              className="w-56 flex-shrink-0"
            />
          </FormSection>
          {!values.isInstrumental.checked && (
            <>
              <FormSection isDisabled={isSubmitting}>
                <SelectInput
                  name="metadataLanguage"
                  label={t("track.metadataLanguage")}
                  items={lnagOptions}
                  defaultValue={initialValues.metadataLanguage}
                />
                <SelectInput
                  name="explicitContent"
                  label={t("track.explicitContent")}
                  items={explicitContentOptions}
                  defaultValue={initialValues.explicitContent}
                />
              </FormSection>
              <FormSection isDisabled={isSubmitting}>
                <div className="w-full md:w-formCol-2">
                  <TextAreaField
                    name="lyrics"
                    label={t("labels.lyrics")}
                    placeholder={errors.lyrics}
                  />
                </div>
              </FormSection>
            </>
          )}

          <FormSection isDisabled={isSubmitting} label={t("labels.authors")}>
            <ArtistPropList
              dataService={tracksService}
              onChange={(selected) => {
                setFieldValue(
                  "artists",
                  selected.map((artist) => ({
                    artistId: artist.id,
                    artistRole: artist.role,
                  }))
                );
              }}
            />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label={t("track.audioFile")}>
            <FileField
              name="audioFile"
              label={`${t("common.choose")} ${t("common.file")}`}
              accept="audio/*"
            />
            <TextField
              disabled
              name="duration"
              label={t("track.duration")}
              placeholder={errors.duration}
              type="time"
              step="2"
            />
            <SelectInput
              name="audioLanguage"
              label={t("track.audioLanguage")}
              items={lnagOptions}
              defaultValue={initialValues.audioLanguage}
              isSearchable
            />
            {/* <DatepickerField
              disabled
              name='releaseDate'
              label={t('labels.releaseDate')}
              defaultValue={initialValues.releaseDate}
            /> */}
          </FormSection>

          <FormSection isDisabled={isSubmitting} label={t("labels.status")}>
            <SelectInput
              name="status"
              label={t("labels.status")}
              items={trackStatusOptions}
              defaultValue={initialValues.status}
            />
          </FormSection>

          <div className="flex gap-x-2">
            <SubmitButton isSubmitting={isSubmitting} className="mt-6">
              <span className="capitalize-first">{t("common.save")}</span>
            </SubmitButton>

            {isEdit && (
              <DeleteButton
                isSubmitting={isSubmitting}
                disabled={!permissions.Tracks.Delete}
                onClick={handleDelete}
              >
                <span className="capitalize-first">{t("common.remove")}</span>
              </DeleteButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TrackForm;
