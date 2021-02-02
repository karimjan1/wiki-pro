import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
  postListReducer,
  postDetailsReducer,
  postCreateReducer,
  postUpdateReducer,
  postDeleteReducer,
  postTopRatedReducer,
} from './reducers/postReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';
const reducer = combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  postTopRated: postTopRatedReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: {userInfo: userInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
