/*
 *
 * PlayerPage reducer
 *
 */
import produce from 'immer';
import { ON_SUBMIT_PLAYERS } from './constants';

export const initialState = {
  players: [],
};

/* eslint-disable default-case, no-param-reassign */
const AppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ON_SUBMIT_PLAYERS:
        draft.players = action.players;
        break;
    }
  });

export default AppContainerReducer;
