import { MUTATIONS } from '@/store/mutation-types';
import { PLAYER_ACTIONS } from '@/lookups/player';
import { GAME_STEPS } from '@/lookups/game-steps';
import { flatten, shuffle } from 'lodash';

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

  setNextPlayer({ state, commit, getters }) {
    const playerNumber =  parseInt(getters.getActivePlayers.indexOf(state.currentPlayer.type));
    commit(
      MUTATIONS.SET_CURRENT_PLAYER,
      getters.getActivePlayers[(playerNumber + 1) % getters.getNumberOfPlayers]
    );
  },

  setCurrentAction({ commit }, action) {
    commit(MUTATIONS.SET_ACTION, action);
  },

  triggerNextStep({ dispatch, getters }) {
    if (!getters.getCurrentPlayer) {
      dispatch('setNextPlayer');
    }

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

  setActivePlayers({ commit, getters }) {
    const activePlayers = Object.keys(
      Object.fromEntries(
        Object.entries(getters.getPlayers())
          .filter(([playerType, player]) => !!player.name)
      )
    );

    commit(MUTATIONS.SET_ACTIVE_PLAYERS, shuffle(activePlayers) ?? []);
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
    const currentStep = getters.getCurrentGameStep;

    if (currentStep > 1) {
      commit(MUTATIONS.SET_CURRENT_GAME_STEP, currentStep - 1);
    }
  },

  setPlayerName({ commit, getters }, { playerType, name }) {
    const player = getters.getPlayers(playerType);
    commit(MUTATIONS.SET_PLAYER_NAME, { player, name });
  },

  resetGame({ commit, getters, dispatch }) {
    const playerNameMapping = getters.getActivePlayers.map(
      playerType => {
        return {
          [playerType]: getters.getPlayers(playerType)?.name
        };
      }
    );

    commit(MUTATIONS.RESET);

    Object.values(playerNameMapping).forEach(player => {
      const name = Object.values(player)[0];
      const type = Object.keys(player)[0];

      dispatch('setPlayerName', {
        playerType: type,
        name
      });
    });
  }
};

export default actions;
