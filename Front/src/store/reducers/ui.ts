import { DataViewMode, DataViewType } from '../../types/globalTypes';
import { ActionType, IAction } from '../actions/actionTypes';

export type UiState = {
  dataViewModes: { [key in DataViewType]: DataViewMode };
  filter: { showPanel: boolean };
};

export type UiAction = {
  viewType: DataViewType;
  viewMode: DataViewMode;
};

const initState: UiState = {
  dataViewModes: {
    artists: DataViewMode.table,
    contacts: DataViewMode.table,
    digitalRelease: DataViewMode.table,
    licensors: DataViewMode.table,
    providers: DataViewMode.table,
    tracks: DataViewMode.table,
    usersManagment: DataViewMode.table,
  },
  filter: { showPanel: false },
};

const ui = (state: UiState = initState, action: Required<IAction<UiAction>>) => {
  switch (action.type) {
    case ActionType.CHANGE_DATA_VIEW_MODE: {
      const { viewType, viewMode } = action.payload;
      return { ...state, dataViewModes: { ...state.dataViewModes, [viewType]: viewMode } };
    }
    case ActionType.FILTER_PANEL_OPEN: {
      return { ...state, filter: { ...state.filter, showPanel: true } };
    }
    case ActionType.FILTER_PANEL_CLOSE: {
      return { ...state, filter: { ...state.filter, showPanel: false } };
    }
    default:
      return state;
  }
};
export default ui;
