import { combineReducers } from "redux";
import { ActionType, IAction } from "store/actions/actionTypes";
import { IArtist, IPresspack, ArtistInterface } from "types/artistTypes";

const emptyPressPack: IPresspack = { artistId: "", biography: "", photos: [] };

const initState: { detail: ArtistInterface | null; pressPack: IPresspack } = {
  detail: null,
  pressPack: emptyPressPack,
};

const detailState = (state = initState.detail, action: IAction<IArtist>) => {
  switch (action.type) {
    case ActionType.GET_ARTIST_DETAIL: {
      return action.payload;
    }
    case ActionType.GET_PRESSPACK_SUCCESS:
    case ActionType.EDIT_PRESSPACK:
    case ActionType.ADD_PRESSPACK: {
      return { ...state, hasPresspack: true };
    }
    case ActionType.GET_PRESSPACK_FAILURE: {
      return { ...state, hasPresspack: false };
    }
    default:
      return state;
  }
};

const presspackState = (
  state = initState.pressPack,
  action: IAction<IPresspack>
) => {
  switch (action.type) {
    case ActionType.GET_PRESSPACK_SUCCESS: {
      return action.payload;
    }
    case ActionType.GET_PRESSPACK_FAILURE: {
      return emptyPressPack;
    }
    case ActionType.ADD_PRESSPACK:
    case ActionType.EDIT_PRESSPACK: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({
  detail: detailState,
  presspack: presspackState,
});
