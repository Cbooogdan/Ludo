<template>
    <div class="home">
        <h1>Welcome to the Game, LUDO Game</h1>

        <transition
                name="slide-up"
                mode="out-in"
        >
            <choose-players
                    v-if="getCurrentGameStep === steps.START"
            />

            <game
                    v-if="getCurrentGameStep === steps.GAME"
            />
        </transition>
    </div>
</template>

<script>
import './Home.scss';
import { GAME_STEPS } from '@/lookups/game-steps';
import { mapGetters } from 'vuex';

const ChoosePlayers = () =>  import('@/components/ChoosePlayers/ChoosePlayers');
const Game = () =>  import('@/components/Game/Game');

export default {
    name: 'HomePage',

    components: {
        ChoosePlayers,
        Game,
    },

    data() {
        return {
            steps: GAME_STEPS,
        };
    },

    computed: {
        ...mapGetters({
            getCurrentGameStep: 'getCurrentGameStep',
        }),
    }
};
</script>
