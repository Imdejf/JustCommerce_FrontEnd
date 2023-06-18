import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ActionType } from './actions/actionTypes';

//Reducers import
import artist from './reducers/artist';
import auth from './reducers/auth';
import currentUser from './reducers/currentUser';
import profiles from './reducers/profiles';
import userPermissions from './reducers/userPermissions';
import activeLanguages from './reducers/activeLanguages';
import ui from './reducers/ui';

const combinedReducer = combineReducers({
  artist,
  auth,
  currentUser,
  activeLanguages,
  profiles,
  userPermissions,
  ui,
});

const appReducer = (state: any, action: any) => {
  if (action.type === ActionType.DESTROY_SESSION) state = undefined; //Logout, dispatch to reset all states
  return combinedReducer(state, action);
};

// Transform actions-type to a string if the action type is a
// number and there's we defined an actiontype for that.
// Else, use the unsanitized action as normal. The reason
// for the checks is to escape dispatched actions from
// packages like react-router or redux-form.
const actionTypeEnumToString = (action: any): any =>
  typeof action.type === 'number' && ActionType[action.type]
    ? {
        type: ActionType[action.type],
        payload: action.payload,
      }
    : action;

// Use the action transformer
// const logger = createLogger({ actionTransformer: actionTypeEnumToString });
const composeEnhancers = composeWithDevTools({
  actionSanitizer: actionTypeEnumToString,
});

const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
