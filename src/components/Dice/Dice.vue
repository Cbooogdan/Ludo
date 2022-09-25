<template>
    <div
            class="dice"
            :class="getClass"
            :style="getStyles"
            @click="generateDiceValue"
    >
        <div
                class="dice__side"
                :style="getStyles"
        >
            <div class="dice__dot one-1" />
        </div>
        <div
                class="dice__side two"
                :style="getStyles"
        >
            <div class="dice__dot two-1" />
            <div class="dice__dot two-2" />
        </div>
        <div
                class="dice__side three"
                :style="getStyles"
        >
            <div class="dice__dot three-1" />
            <div class="dice__dot three-2" />
            <div class="dice__dot three-3" />
        </div>
        <div
                class="dice__side four"
                :style="getStyles"
        >
            <div class="dice__dot four-1" />
            <div class="dice__dot four-2" />
            <div class="dice__dot four-3" />
            <div class="dice__dot four-4" />
        </div>
        <div
                class="dice__side five"
                :style="getStyles"
        >
            <div class="dice__dot five-1" />
            <div class="dice__dot five-2" />
            <div class="dice__dot five-3" />
            <div class="dice__dot five-4" />
            <div class="dice__dot five-5" />
        </div>
        <div
                class="dice__side six"
                :style="getStyles"
        >
            <div class="dice__dot six-1" />
            <div class="dice__dot six-2" />
            <div class="dice__dot six-3" />
            <div class="dice__dot six-4" />
            <div class="dice__dot six-5" />
            <div class="dice__dot six-6" />
        </div>
    </div>
</template>

<script>
import './Dice.scss';
import { mapActions, mapGetters } from 'vuex';
import { PLAYER_ACTIONS } from '@/lookups/player';

export default {
    name: 'DiceComponent',

    data: () => ({
        number: 1,
    }),

    computed: {
        ...mapGetters({
            getCurrentAction: 'getCurrentAction',
            getCurrentPlayer: 'getCurrentPlayer',
            getPlayerColor: 'getPlayerColor',
        }),

        getClass() {
            return `show-${this.number}`;
        },

        getStyles() {
            return this.isDiceActive?
                {
                    'box-shadow': `0 0 27px 10px ${this.getPlayerColor(this.getCurrentPlayer)}`,
                } :
                {};
        },

        isDiceActive() {
            return this.getCurrentAction === PLAYER_ACTIONS.rollDice;
        }
    },

    methods: {
        ...mapActions({
            setCurrentDice: 'setCurrentDice',
            triggerNextStep: 'triggerNextStep',
        }),

        generateDiceValue() {
            if (!this.isDiceActive) {
                return;
            }

            this.number = Math.floor((Math.random() * 6) + 1);
            this.setCurrentDice(this.number);
            this.triggerNextStep();
        },
    }
};
</script>
