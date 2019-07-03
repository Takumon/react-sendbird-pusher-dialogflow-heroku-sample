import * as types from '../constants/ActionTypes.js'

export const setUserId = userId => ({ type: types.SET_USER_ID, userId });
export const clearUserId = userId => ({ type: types.CLEAR_USER_ID });
