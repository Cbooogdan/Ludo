<template>
    <div class="game">
        <div class="game__top">
            <button
                    class="game__button button"
                    @click="goToChoosePlayers"
            >
                <span class="button__arrow" />
            </button>

            <timer-component
                    ref="timerComponent"
                    v-model="timeLapsedInSeconds"
            />

            <button
                    class="game__button button"
                    @click="handleResetGame"
            >
                Reset
            </button>
        </div>

        <div
                :key="`game-${resetGameKey}`"
                class="game__content"
        >
            <div
                    v-if="getPlayerWonName"
                    class="game__won"
            >
                <p>
                    Player
                    <br>
                    {{ getPlayerWonName }}
                    <br>
                    won!
                </p>
            </div>

            <home-start
                    v-for="player in PLAYERS"
                    :key="`player-${player}`"
                    :player="player"
                    :show-pawns="activePlayers.includes(player)"
            />

            <cell
                    v-for="cell in 40"
                    :key="`cell-${cell}`"
                    :number="cell"
                    :type="CELL_TYPES.NORMAL"
            />

            <cell
                    v-for="cell in 4"
                    :key="`cell-f-b-${cell}`"
                    :number="cell"
                    :type="CELL_TYPES.FINISH_BLUE"
            />

            <cell
                    v-for="cell in 4"
                    :key="`cell-f-g-${cell}`"
                    :number="cell"
                    :type="CELL_TYPES.FINISH_GREEN"
            />

            <cell
                    v-for="cell in 4"
                    :key="`cell-f-r-${cell}`"
                    :number="cell"
                    :type="CELL_TYPES.FINISH_RED"
            />

            <cell
                    v-for="cell in 4"
                    :key="`cell-f-y-${cell}`"
                    :number="cell"
                    :type="CELL_TYPES.FINISH_YELLOW"
            />

            <dice />
        </div>
    </div>
</template>

<script>
import './Game.scss';

import Cell from '@/components/Cell/Cell';
import { PLAYERS } from '@/lookups/player';
import Dice from '@/components/Dice/Dice';
import { mapActions, mapGetters } from 'vuex';
import { CELL_TYPES } from '@/lookups/cell';

const HomeStart = () => import('@/components/HomeStart/HomeStart');
const TimerComponent = () => import('@/components/Timer/Timer');

export default {
    name: 'GameComponent',

    components: {
        TimerComponent,
        Dice,
        HomeStart,
        Cell
    },

    data() {
        return {
            PLAYERS,
            CELL_TYPES,
            timeLapsedInSeconds: 0,
            resetGameKey: 0,
        };
    },

    computed: {
        ...mapGetters({
            getPlayerWhoWon: 'getPlayerWhoWon',
            getPlayers: 'getPlayers',
            getActivePlayers: 'getActivePlayers',
        }),

        activePlayers() {
            return this.getActivePlayers;
        },

        getPlayerWonName() {
            return this.getPlayers(this.getPlayerWhoWon)?.name;
        },
    },

    methods: {
        ...mapActions({
            setActivePlayers: 'setActivePlayers',
            triggerNextStep: 'triggerNextStep',
            decreaseCurrentGameStep: 'decreaseCurrentGameStep',
            resetGame: 'resetGame',
        }),

        init() {
            this.setActivePlayers();
            this.triggerNextStep();
        },

        goToChoosePlayers() {
            this.resetGame();
            this.$confetti.stop();
            this.decreaseCurrentGameStep();
        },

        handleResetGame() {
            this.timeLapsedInSeconds = 0;
            this.$refs.timerComponent.deleteInterval();
            this.$refs.timerComponent.createInterval();
            this.resetGame();
            this.$confetti.stop();
            this.init();
            this.resetGameKey += 1;
        },

        startConfetti() {
            this.$confetti.start({
                particlesPerFrame: 1,
                defaultSize: 6,
            });

            setTimeout(() => {
                this.$confetti.stop();
            }, 4000);
        }
    },

    mounted() {
        this.init();
    },

    watch: {
        getPlayerWhoWon: {
            immediate: true,
            handler(newValue) {
                if (!newValue) {
                    return ;
                }

                this.timeLapsedInSeconds = 0;
                this.startConfetti();

                if (this.$refs?.timerComponent) {
                    this.$refs.timerComponent.deleteInterval();
                }
            }
        }
    },
};
</script>
