<template>
    <div class="choose-players">
        <h2 class="choose-players__title">
            Choose players
        </h2>

        <div class="choose-players__player-wrapper">
            <div
                    class="choose-players__player player"
                    v-for="(player, indexPlayer) in players"
                    :key="`player-${indexPlayer}`"
            >
                <button
                        class="player__button"
                        :class="{ 'active': currentPlayerView === indexPlayer }"
                        @click="setPlayerView(indexPlayer)"
                >
                    <span>
                        {{ indexPlayer + 1 }}
                    </span>

                    <span
                            class="player__remove"
                            v-if="players.length > 2"
                            @click="handleRemovePlayer(player)"
                    >
                        X
                    </span>
                </button>
            </div>

            <div
                    v-if="players.length <= 3"
                    class="choose-players__player player"
            >
                <button
                        class="player__button"
                        @click="addMorePlayers"
                >
                    <span>
                        +
                    </span>
                </button>
            </div>
        </div>

        <div class="choose-players__data">
            <input
                    class="choose-players__name"
                    type="text"
                    name="player-name"
                    v-model="currentPlayerData.name"
            >

            <div class="choose-players__color-wrapper">
                <span
                        v-for="(color, index) in colors"
                        :key="`color-${index}`"
                        class="choose-players__color"
                        :class="{
                            'selected': currentPlayerData.color === color,
                            'disabled': !remainingColors.includes(color) && currentPlayerData.color !== color,
                        }"
                        :style="{background: color}"
                        @click="remainingColors.includes(color) ? setColor(currentPlayerData, color) : null"
                />
            </div>
        </div>

        <button
                class="button"
                @click="handleStart"
        >
            Start
        </button>
    </div>
</template>

<script>
import './ChoosePlayers.scss';
import { mapActions } from 'vuex';
import { COLOR_TO_PLAYER } from '@/lookups/player';


const COLORS = [
    'blue',
    'yellow',
    'red',
    'green',
];

export default {
    name: 'ChoosePlayers',

    data() {
        return {
            players: [
                {
                    name: 'Player Yellow',
                    color: 'yellow',
                    dropdownState: false,
                }, {
                    name: 'Player Red',
                    color: 'red',
                    dropdownState: false,
                },
            ],
            colors: COLORS,
            currentPlayerView: 0,
        };
    },

    computed: {
        remainingColors() {
            const colorsUsed = Object.values(this.players).map(player => player.color);
            return this.colors.filter(color => !colorsUsed.includes(color));
        },

        currentPlayerData() {
            return this.players[this.currentPlayerView];
        },
    },

    methods: {
        ...mapActions({
            increaseCurrentGameStep: 'increaseCurrentGameStep',
            setPlayerName: 'setPlayerName',
        }),

        handleStart() {
            const validPlayers = this.players.filter(player => player.name && player.color);
            if (validPlayers.length < 2) {
                return;
            }

            validPlayers.forEach(player => {
                this.setPlayerName({
                    playerType: COLOR_TO_PLAYER[player.color],
                    name: player.name
                });
            });
            this.increaseCurrentGameStep();
        },

        setColor(player, color) {
            player.color = color;
            player.dropdownState = false;
        },

        handleRemovePlayer(removedPlayer) {
            this.players = this.players.filter(player => player !== removedPlayer);
        },

        setPlayerView(playerIndex) {
            this.currentPlayerView = playerIndex;
        },

        addMorePlayers() {
            if (this.players.length > 3) {
                return;
            }

            this.players.push({
                name: '',
                color: '',
                dropdownState: false,
            });

            this.setPlayerView(this.players.length - 1);
        }
    },
};
</script>
