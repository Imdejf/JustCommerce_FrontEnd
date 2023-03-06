import { ILanguageResponse } from "../../types/Language/languageTypes";
import { ActionType, IAction } from "../actions/actionTypes";

const activeLanguagesState = (
  state: ILanguageResponse | null = null,
  action: IAction<ILanguageResponse>
) => {
  switch (action.type) {
    case ActionType.GET_LANGUAGES_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default activeLanguagesState;
