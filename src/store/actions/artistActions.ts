import { Dispatch } from "redux";
import artistsService from "services/artistServices";
import { RootState } from "store/store";
import {
  IArtist,
  IPresspack,
  PresspackPhotosFormData,
} from "types/artistTypes";
import { artistFromDTO } from "utils/artistUtils";
import { getErrorsArray, showServerErrors } from "utils/errorsUtils";
import { ActionType } from "./actionTypes";

const getArtistSuccess = (artist: IArtist) => ({
  type: ActionType.GET_ARTIST_DETAIL,
  payload: artist,
});

export const getArtistDetail = (artistId: string) => (dispatch: Dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const artistDTO = await artistsService.get(artistId);
      //@ts-ignore
      const artist = artistFromDTO(artistDTO);
      //@ts-ignore
      dispatch(getArtistSuccess(artist));
      resolve(artist);
    } catch (error: any) {
      const errors = showServerErrors(error);
      reject(errors);
    }
  });

const getPresspackSuccess = (presspack: IPresspack) => ({
  type: ActionType.GET_PRESSPACK_SUCCESS,
  payload: presspack,
});

const getPresspackFailure = () => ({
  type: ActionType.GET_PRESSPACK_FAILURE,
});

export const getPresspack = (artistId: string) => (dispatch: Dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const presspack = await artistsService.getPressPack(artistId);

      dispatch(getPresspackSuccess(presspack));
      resolve(presspack);
    } catch (error: any) {
      if (error.StatusCode === 404) {
        dispatch(getPresspackFailure());
      } else {
        showServerErrors(error);
      }

      const errors = getErrorsArray(error);
      reject(errors);
    }
  });

const addPresspackSuccess = (pressPack: IPresspack) => ({
  type: ActionType.ADD_PRESSPACK,
  payload: pressPack,
});

const editPresspackSuccess = (pressPack: IPresspack) => ({
  type: ActionType.EDIT_PRESSPACK,
  payload: pressPack,
});

export const addPressPack =
  ({ photos }: Pick<PresspackPhotosFormData, "photos">) =>
  (dispatch: Dispatch, getState: () => RootState) =>
    new Promise(async (resolve, reject) => {
      try {
        const { detail }: { detail: IArtist } = getState().artist;

        const notEmptyPhotos = photos.filter((img) => !!img);
        const res = await artistsService.addPressPack({
          imagesAsBase64Strings: notEmptyPhotos,
          artistId: detail.id,
          biography: "",
        });

        dispatch(addPresspackSuccess(res));
        resolve(res);
      } catch (err: any) {
        const errors = showServerErrors(err);
        reject(errors);
      }
    });

export const editPressPack =
  ({ added, removed }: Omit<PresspackPhotosFormData, "photos">) =>
  (dispatch: Dispatch, getState: () => RootState) =>
    new Promise(async (resolve, reject) => {
      try {
        const { presspack } = getState().artist;

        const notEmptyAdded = added.filter((img) => !!img);
        const notEmptyRemoved = removed.filter((img) => !!img);

        const res = await artistsService.editPressPack({
          presspackId: presspack?.presspackId || "",
          biography: presspack?.biography || "",
          filesToRemoveIds: notEmptyRemoved,
          newImagesAsBase64Strings: notEmptyAdded,
        });

        dispatch(editPresspackSuccess(res));
        resolve(res);
      } catch (err: any) {
        const errors = showServerErrors(err);
        reject(errors);
      }
    });

export const addBiography =
  (values: { biography: string }) =>
  (dispatch: Dispatch, getState: () => RootState) =>
    new Promise(async (resolve, reject) => {
      try {
        const { detail }: { detail: IArtist } = getState().artist;

        const res = await artistsService.addPressPack({
          imagesAsBase64Strings: [],
          artistId: detail.id,
          biography: values.biography,
        });

        dispatch(addPresspackSuccess(res));
        resolve(res);
      } catch (err: any) {
        const errors = showServerErrors(err);
        reject(errors);
      }
    });

export const editBiography =
  (values: { biography: string }) =>
  (dispatch: Dispatch, getState: () => RootState) =>
    new Promise(async (resolve, reject) => {
      try {
        const { presspack } = getState().artist;

        const res = await artistsService.editPressPack({
          presspackId: presspack?.presspackId,
          biography: values.biography,
          filesToRemoveIds: [],
          newImagesAsBase64Strings: [],
        });

        dispatch(editPresspackSuccess(res));
        resolve(res);
      } catch (err: any) {
        const errors = showServerErrors(err);
        reject(errors);
      }
    });
