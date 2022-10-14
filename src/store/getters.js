import { CELL_TYPES_TO_FINISH } from '@/lookups/cell';
import { PLAYER_ORDER } from '@/lookups/player';

const getters = {
  getPlayers: state => (player = null) => {
    if (player) {
      return state.players[player];
    }

    return state.players;
  },

  getCellPawn: state => (type, number) => {
    let pawnToCell = null;

    Object.entries(state.players).forEach(player => {
      return player[1].pawns.forEach(pawn => {
        if (pawn.place.type === type && pawn.place.number === number) {
          pawnToCell = pawn;
        }
      });
    });

    return pawnToCell;
  },

  getPawn: state => (pawnId, player) => {
    return state.players[player].pawns.find(pawn => pawn.id === pawnId);
  },

  getPlayerColor: state => player => {
    return state.players[player].color;
  },

  getPlayerName: state => player => {
    return state.players[player].name;
  },

  getMovingPawn: state => {
    return state.movingPawn;
  },

  getCurrentPlayer: state => {
    return state.currentPlayer.type;
  },

  getCurrentDice: state => {
    return state.currentDice;
  },

  getMovementsLeft: state => {
    return state.currentPlayer.movementsLeft;
  },

  getCurrentAction: state => {
    return state.currentAction;
  },

  getPlayerWhoWon: state => {
    const playerWhoWon = Object.entries(state.players).filter(([playerType, player]) => {
      return player.pawns.every(pawn => {
        return CELL_TYPES_TO_FINISH.includes(pawn.place.type);
      });
    })[0];

    if (playerWhoWon?.length) {
      return playerWhoWon[0];
    }

    return null;
  },

  getCurrentGameStep: state => {
    return state.currentGameStep;
  },

  numberOfPlayers: state => {
    return Object.values(state.players).filter(player => !!player.name)?.length ?? 0;
  },

  currentPlayerOrder: state => {
    return Object.keys(PLAYER_ORDER).find(key => {
      console.log(key);
      return PLAYER_ORDER[key] === state.currentPlayer.type;
    });
  }
};

export default getters;
