import { PLAYERS } from '@/lookups/player';
import { GAME_STEPS } from '@/lookups/game-steps';

export const defaultState = () => {
  return {
    currentPlayer: {
      type: null,
      movementsLeft: 0
    },
    activePlayers: [],
    currentAction: null,
    currentDice: null,
    movingPawn: null,
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
        name: '',
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
        name: '',
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
        name: '',
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
        name: '',
      },
    }
  };
};

const state = {
  ...defaultState(),
  currentGameStep: GAME_STEPS.START,
};

export default state;
