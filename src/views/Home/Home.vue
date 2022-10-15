<template>
    <div class="home">
        <h1 class="home__title">
            Welcome to the Game,
            <br>
            LUDO Game
        </h1>

        <transition
                name="slide-up"
                mode="out-in"
        >
            <start-screen
                    v-if="getCurrentGameStep === steps.START"
            />

            <choose-players
                    v-if="getCurrentGameStep === steps.PLAYERS"
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
import StartScreen from '@/components/StartScreen/StartScreen';

const ChoosePlayers = () =>  import('@/components/ChoosePlayers/ChoosePlayers');
const Game = () =>  import('@/components/Game/Game');

export default {
    name: 'HomePage',

    components: {
        StartScreen,
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
