import { IPermissionProfile } from '../../types/permissionsTypes';
import { ActionType, IAction } from '../actions/actionTypes';

const profiles = (state: Array<IPermissionProfile> | [] = [], action: IAction<Array<IPermissionProfile>>) => {
  switch (action.type) {
    case ActionType.GET_PROFILES_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default profiles;
