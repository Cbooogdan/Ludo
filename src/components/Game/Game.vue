<template>
    <div class="game">
        <template v-if="!playerWonMessage">
            <h2 class="">
                Player Turn: {{ getPlayerTurn }}
            </h2>

            <p>{{ getCurrentAction }}</p>
        </template>

        <template v-else>
            <h2>{{ playerWonMessage }}</h2>
        </template>

        <div class="game-content">
            <home-start
                    v-for="player in PLAYERS"
                    :key="`player-${player}`"
                    :player="player"
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
import HomeStart from '@/components/HomeStart/HomeStart';
import { PLAYERS } from '@/lookups/player';
import Dice from '@/components/Dice/Dice';
import { mapActions, mapGetters } from 'vuex';
import { CELL_TYPES } from '@/lookups/cell';

export default {
    name: 'GameComponent',

    components: {
        Dice,
        HomeStart,
        Cell
    },

    data() {
        return {
            PLAYERS,
            CELL_TYPES,
        };
    },

    computed: {
        ...mapGetters({
            getCurrentPlayer: 'getCurrentPlayer',
            getPlayerName: 'getPlayerName',
            getCurrentAction: 'getCurrentAction',
            getPlayerWhoWon: 'getPlayerWhoWon',
            getPlayers: 'getPlayers',
        }),

        getPlayerTurn() {
            return this.getPlayerName(this.getCurrentPlayer);
        },

        playerWonMessage() {
            return this.getPlayerWhoWon ?
                `Player ${this.getPlayers(this.getPlayerWhoWon)?.name} won!` :
                '';
        }
    },

    methods: {
        ...mapActions({
            triggerNextStep: 'triggerNextStep',
        }),

        init() {
            this.triggerNextStep();
        },
    },

    mounted() {
        this.init();
    }
};
</script>
