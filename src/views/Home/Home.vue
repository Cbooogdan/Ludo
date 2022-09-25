<template>
    <div class="home">
        <h1>Welcome to the Game, LUDO Game</h1>

        <transition name="slide-up">
            <start-screen
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
import StartScreen from '@/components/StartScreen/StartScreen';
import { GAME_STEPS } from '@/lookups/game-steps';
import { mapGetters } from 'vuex';

const Game = () =>  import('@/components/Game/Game');

export default {
    name: 'HomePage',

    components: {
        StartScreen,
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
