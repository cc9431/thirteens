/*
 *
 * PlayerPage actions
 *
 */

import { ON_SUBMIT_PLAYERS } from './constants';

export function onSubmitPlayers(players) {
  return {
    type: ON_SUBMIT_PLAYERS,
    players,
  };
}
