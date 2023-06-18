import { IUser } from "../../types/userTypes";
import { ActionType, IAction } from "../actions/actionTypes";

const currentUserState = (
  state: IUser | null = null,
  action: IAction<IUser>
) => {
  switch (action.type) {
    case ActionType.GET_CUR_USER_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default currentUserState;
