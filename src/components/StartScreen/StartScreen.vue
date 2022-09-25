<template>
    <div class="start-screen">
        <h2>Enter player name</h2>

        <div
                class="start-screen__player"
                v-for="(player, indexPlayer) in players"
                :key="`player-${indexPlayer}`"
        >
            <input
                    class="start-screen__player-name"
                    type="text"
                    name="player-name"
                    v-model="player.name"
            >

            <div class="start-screen__color-picker color-picker">
                <div
                        class="color-picker__button"
                        @click="player.dropdownState = !player.dropdownState"
                >
                    <template v-if="player.color">
                        <span :style="{background: player.color}" />
                        {{ player.color }}
                    </template>

                    <span v-else>
                        Color
                    </span>
                </div>

                <ul
                        class="color-picker__dropdown"
                        v-if="remainingColors.length"
                        v-show="player.dropdownState"
                >
                    <li
                            v-for="(color, index) in remainingColors"
                            :key="`color-${index}`"
                            @click="setColor(player, color)"
                    >
                        <span :style="{background: color.color}" /> {{ color.name }}
                    </li>
                </ul>
            </div>

            <div class="start-screen__remove-wrapper">
                <span
                        class="start-screen__remove"
                        v-if="indexPlayer !== 0"
                        @click="handleRemovePlayer(player)"
                >
                    X
                </span>
            </div>
        </div>

        <button @click="handleStart">
            Start
        </button>
    </div>
</template>

<script>
import './StartScreen.scss';
import { mapActions } from 'vuex';
import { COLOR_TO_PLAYER } from '@/lookups/player';


const COLORS = [
    {
        color: 'blue',
        name: 'Blue'
    },
    {
        color: 'yellow',
        name: 'Yellow'
    },
    {
        color: 'red',
        name: 'Red'
    },
    {
        color: 'green',
        name: 'Green'
    }
];

export default {
    name: 'StartScreen',

    data() {
        return {
            players: [
                {
                    name: 'Player Blue',
                    color: 'blue',
                    dropdownState: false,
                }, {
                    name: 'Player Red',
                    color: 'red',
                    dropdownState: false,
                }
            ],
            colors: COLORS,
        };
    },

    computed: {
        remainingColors() {
            const colorsUsed = Object.values(this.players).map(player => player.color);
            return Object.values(this.colors).filter(color => !colorsUsed.includes(color.color));
        }
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
            player.color = color.color;
            player.dropdownState = false;
        },

        handleRemovePlayer(removedPlayer) {
            this.players = this.players.filter(player => player !== removedPlayer);
        }
    },

    watch: {
        'players': {
            deep: true,
            immediate: true,
            handler(players) {
                const areAllFieldsFilled = players.every(player => {
                    return !!player?.name && player?.color;
                });

                if (areAllFieldsFilled && players.length <= 3) {
                    this.players.push({
                        name: '',
                        color: '',
                        dropdownState: false,
                    });
                }
            }
        }
    }
};
</script>
