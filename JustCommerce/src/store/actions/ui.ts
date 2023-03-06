import { DataViewMode } from '../../types/globalTypes';
import { ActionType } from './actionTypes';

export const changeDataViewMode = (viewType: string, viewMode: DataViewMode) => ({
  type: ActionType.CHANGE_DATA_VIEW_MODE,
  payload: { viewType, viewMode },
});

export const showFilterPanel = () => ({
  type: ActionType.FILTER_PANEL_OPEN,
});

export const closeFilterPanel = () => ({
  type: ActionType.FILTER_PANEL_CLOSE,
});
