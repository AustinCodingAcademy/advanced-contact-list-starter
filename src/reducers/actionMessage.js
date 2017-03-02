import { ACTION_MESSAGE } from '../actions/index';

export function actionMessage(state = 'action message', action) {
  if (action.type === ACTION_MESSAGE) {
    return action.payload;
  }
  return state;
}
