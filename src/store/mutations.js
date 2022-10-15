import { MUTATIONS } from '@/store/mutation-types';
import { cloneDeep } from 'lodash';
import { defaultState } from '@/store/state';

const mutations = {
  [MUTATIONS.SET_MOVING_PAWN](state, pawn = null) {
    state.movingPawn = pawn ? cloneDeep(pawn) : null;
  },

  [MUTATIONS.SET_PAWN_PLACE](state, { pawn, place }) {
    pawn.place = place;
  },

  [MUTATIONS.SET_DICE](state, diceValue) {
    state.currentDice = diceValue;
  },

  [MUTATIONS.SET_CURRENT_PLAYER](state, player) {
    state.currentPlayer.type = player;
  },

  [MUTATIONS.SET_MOVEMENTS](state, movements) {
    state.currentPlayer.movementsLeft = movements;
  },

  [MUTATIONS.SET_ACTION](state, action) {
    state.currentAction = action;
  },

  [MUTATIONS.SET_CURRENT_GAME_STEP](state, step) {
    state.currentGameStep = step;
  },

  [MUTATIONS.SET_PLAYER_NAME](state, { player, name }) {
    player.name = name;
  },

  [MUTATIONS.SET_ACTIVE_PLAYERS](state, players) {
    state.activePlayers = players;
  },

  [MUTATIONS.RESET](state) {
    Object.assign(state, defaultState());
  },
};

export default mutations;
