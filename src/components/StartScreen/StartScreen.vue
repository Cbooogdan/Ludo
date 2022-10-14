<template>
    <div class="start-screen">
        <div class="start-screen__buttons">
            <button
                    class="button"
                    @click="handleStart"
            >
                Play Local
            </button>

            <button
                    class="button"
                    disabled
            >
                Play Online
            </button>
        </div>
    </div>
</template>
<script>
import './StartScreen.scss';
import { mapActions } from 'vuex';

export default {
    name: 'StartScreen',

    methods: {
        ...mapActions({
            increaseCurrentGameStep: 'increaseCurrentGameStep',
        }),

        handleStart() {
            this.increaseCurrentGameStep();
        },
    }
};
</script>
