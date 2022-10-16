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

        <footer-component />
    </div>
</template>

<script>
import './Home.scss';
import { GAME_STEPS } from '@/lookups/game-steps';
import { mapGetters } from 'vuex';

const ChoosePlayers = () =>  import('@/components/ChoosePlayers/ChoosePlayers');
const Game = () =>  import('@/components/Game/Game');
const StartScreen = () =>  import('@/components/StartScreen/StartScreen');
const FooterComponent = () =>  import('@/components/Footer/Footer');

export default {
    name: 'HomePage',

    components: {
        FooterComponent,
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
