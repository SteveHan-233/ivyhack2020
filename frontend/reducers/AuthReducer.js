import { combineReducers } from 'redux';

const initialState = { error: '', token: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'signin':
      return { error: '', token: action.payload };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
