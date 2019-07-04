import {
  SET_USER_ID,
  CLEAR_USER_ID,
} from '../constants/ActionTypes'

const initialState = {
  userId: null,
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case SET_USER_ID:
      return {
        userId: action.userId,
      };
    case CLEAR_USER_ID:
      return {
        userId: null,
      };
    default:
      return state;
  }
}
