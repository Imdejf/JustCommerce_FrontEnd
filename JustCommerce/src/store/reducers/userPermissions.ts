import { IPermissions } from '../../types/permissionsTypes';
import { ActionType, IAction } from '../actions/actionTypes';

const userPermissions = (state: IPermissions | null = null, action: IAction) => {
  switch (action.type) {
    case ActionType.GET_PERMISSIONS_SUCCESS: {
      return action.payload;
    }
    case ActionType.CHANGE_PERMISSIONS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default userPermissions;
