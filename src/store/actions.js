import { MUTATIONS } from '@/store/mutation-types';
import { PLAYER_ORDER } from '@/lookups/player';
import { PLAYER_ACTIONS } from '@/lookups/player';
import { GAME_STEPS } from '@/lookups/game-steps';

const actions = {
  setMovingPawn({ commit, getters }, { pawnId, player }) {
    const pawn = getters.getPawn(pawnId, player);
    commit(MUTATIONS.SET_MOVING_PAWN, pawn);
  },

  setPawnPlace({ commit, getters }, { pawnId, player, place }) {
    const pawn = getters.getPawn(pawnId, player);
    commit(MUTATIONS.SET_PAWN_PLACE, { pawn, place });
    commit(
      MUTATIONS.SET_MOVEMENTS,
      getters.getMovementsLeft !== 0 ? getters.getMovementsLeft - 1 : 0
    );
  },

  removeMovingPawn({ commit }) {
    commit(MUTATIONS.SET_MOVING_PAWN, null);
  },

  sendPawnHome({ commit, getters }, { pawnId, player }) {
    const pawn = getters.getPawn(pawnId, player);
    commit(MUTATIONS.SET_PAWN_PLACE, {
      pawn,
      place: {type: 'home'}
    });
  },

  resetMovingPawn({ commit, getters }) {
    const movingPawn = getters.getMovingPawn;
    const pawn = getters.getPawn(movingPawn.id, movingPawn.player);
    commit(MUTATIONS.SET_PAWN_PLACE, { pawn, place: movingPawn.place });
  },

  setCurrentDice({ commit }, diceValue) {
    commit(MUTATIONS.SET_DICE, diceValue);
    commit(MUTATIONS.SET_MOVEMENTS, diceValue === 6 ? 2 : 1);
  },

  setNextPlayer({ commit, getters }) {
    commit(
      MUTATIONS.SET_CURRENT_PLAYER,
      PLAYER_ORDER[(getters.currentPlayerOrder + 1) % getters.numberOfPlayers]
    );
  },

  setCurrentAction({ commit }, action) {
    commit(MUTATIONS.SET_ACTION, action);
  },

  triggerNextStep({ dispatch, getters }) {
    switch (getters.getCurrentAction) {
      case PLAYER_ACTIONS.rollDice:
        dispatch('setCurrentAction', PLAYER_ACTIONS.movePawn);
        break;
      case PLAYER_ACTIONS.movePawn:
        if (getters.getMovementsLeft === 0) {
          dispatch('setNextPlayer');
          dispatch('setCurrentAction', PLAYER_ACTIONS.rollDice);
          break;
        }
        if (getters.getMovementsLeft === 1) {
          dispatch('setCurrentAction', PLAYER_ACTIONS.rollDice);
          break;
        }
        break;
      default:
        dispatch('setCurrentAction', PLAYER_ACTIONS.rollDice);
        break;
    }
  },

  setCurrentGameStep({ commit }, step) {
    commit(MUTATIONS.SET_CURRENT_GAME_STEP, step);
  },

  increaseCurrentGameStep({ commit, getters }) {
    const maxSteps = Object.keys(GAME_STEPS).length;
    const currentStep = getters.getCurrentGameStep;

    if (currentStep < maxSteps) {
      commit(MUTATIONS.SET_CURRENT_GAME_STEP, currentStep + 1);
    }
  },

  decreaseCurrentGameStep({ commit, getters }) {
    const maxSteps = Object.keys(GAME_STEPS).length;
    const currentStep = getters.getCurrentGameStep;

    if (currentStep > 1) {
      commit(MUTATIONS.SET_CURRENT_GAME_STEP, currentStep - 1);
    }
  },

  setPlayerName({ commit, getters }, { playerType, name }) {
    const player = getters.getPlayers(playerType);
    commit(MUTATIONS.SET_PLAYER_NAME, { player, name });
  }
};

export default actions;
