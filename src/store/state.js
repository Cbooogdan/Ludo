import { PLAYERS } from '@/lookups/player';
import { GAME_STEPS } from '@/lookups/game-steps';

const state = {
  currentPlayer: {
    type: PLAYERS.PLAYER_BLUE,
    movementsLeft: 0
  },
  currentAction: null,
  currentDice: null,
  movingPawn: null,
  currentGameStep: GAME_STEPS.START,
  players: {
    [PLAYERS.PLAYER_RED]: {
      pawns: [
        {
          id: 1,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_RED,
        },
        {
          id: 2,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_RED,
        },
        {
          id: 3,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_RED,
        },
        {
          id: 4,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_RED,
        }
      ],
      color: 'red',
      name: 'red',
    },
    [PLAYERS.PLAYER_BLUE]: {
      pawns: [
        {
          id: 1,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_BLUE,
        },
        {
          id: 2,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_BLUE,
        },
        {
          id: 3,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_BLUE,
        },
        {
          id: 4,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_BLUE,
        }
      ],
      color: 'blue',
      name: 'blue',
    },
    [PLAYERS.PLAYER_YELLOW]: {
      pawns: [
        {
          id: 1,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_YELLOW,
        },
        {
          id: 2,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_YELLOW,
        },
        {
          id: 3,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_YELLOW,
        },
        {
          id: 4,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_YELLOW,
        }
      ],
      color: 'yellow',
      name: 'yellow',
    },
    [PLAYERS.PLAYER_GREEN]: {
      pawns: [
        {
          id: 1,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_GREEN,
        },
        {
          id: 2,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_GREEN,
        },
        {
          id: 3,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_GREEN,
        },
        {
          id: 4,
          place: {
            type: 'home',
          },
          player: PLAYERS.PLAYER_GREEN,
        }
      ],
      color: 'green',
      name: 'green',
    },
  }
};

export default state;
