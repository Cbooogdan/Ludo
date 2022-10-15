<template>
    <div class="timer">
        <div
                v-for="type in digitTypes"
                :key="`type-${type}`"
                :ref="type"
                class="digit"
                :class="type"
        >
            <span class="base" />
            <div class="flap over front" />
            <div class="flap over back" />
            <div class="flap under" />
        </div>
    </div>
</template>
<script>
import './Timer.scss';

const DIGIT_TYPES = [
    'ten-hour',
    'hour',
    'ten-min',
    'min',
    'ten-sec',
    'sec',
];

export default {
    name: 'TimerComponent',

    props: {
        value: {
            type: Number,
        }
    },

    data() {
        return {
            digitTypes: DIGIT_TYPES,
            intervalToFlip: null,
            timeLapsedInSeconds: this.value,
        };
    },

    methods: {
        flipTo(digit, n) {
            const current = digit.dataset['num'];
            digit.dataset['num'] = n;
            digit.getElementsByClassName('front')[0].dataset['content'] = current;
            digit.getElementsByClassName('back')[0].dataset['content'] = n;
            digit.getElementsByClassName('under')[0].dataset['content'] = n;

            for(const element of digit.getElementsByClassName('flap')) {
                element.style['display'] = 'block';
            }

            setTimeout(() => {
                digit.getElementsByClassName('base')[0].innerHTML = n;

                for(const element of digit.getElementsByClassName('flap')) {
                    element.style['display'] = 'none';
                }

            }, 350);
        },

        jumpTo(digit, n) {
            digit.dataset['num'] = n;
            digit.getElementsByClassName('base')[0].innerHTML = n;
        },

        updateGroup(group, number, flip) {
            const digit1 = this.$refs['ten-'+group][0];
            const digit2 = this.$refs[group][0];

            if(number.length === 1) {
                number = `0${number}`;
            }

            const num1 = number.substr(0, 1);
            const num2 = number.substr(1, 1);

            if(digit1?.dataset['num'] !== num1) {
                if(flip) {
                    this.flipTo(digit1, num1);
                } else {
                    this.jumpTo(digit1, num1);
                }
            }

            if(digit2?.dataset['num'] !== num2) {
                if(flip) {
                    this.flipTo(digit2, num2);
                } else {
                    this.jumpTo(digit2, num2);
                }
            }
        },

        setTime(flip) {
            this.timeLapsedInSeconds += 1;

            const seconds = this.timeLapsedInSeconds % 60;
            const minutes = Math.floor(this.timeLapsedInSeconds / 60);
            const hours = Math.floor(this.timeLapsedInSeconds / (60*60));

            this.updateGroup('sec', String(seconds), flip);
            this.updateGroup('min', String(minutes), flip);
            this.updateGroup('hour', String(hours), flip);
        },

        createInterval() {
            this.setTime(false);
            this.intervalToFlip = setInterval(() => {
                this.setTime(true);
            }, 1000);
        },

        deleteInterval() {
            clearInterval(this.intervalToFlip);
        }
    },

    mounted() {
        this.createInterval();
    },

    destroyed() {
        this.deleteInterval();
    },

    watch: {
        value(newValue) {
            this.timeLapsedInSeconds = newValue;
        },
        timeLapsedInSeconds: {
            deep: true,
            immediate: true,
            handler() {
                this.$emit('input', this.timeLapsedInSeconds);
            },
        },
    }
};
</script>
