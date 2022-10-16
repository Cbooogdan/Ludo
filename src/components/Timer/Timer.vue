<template>
    <div class="timer">
        <div
                v-for="section in digitTypes"
                :key="`section-${section}`"
                class="timer__section"
        >
            <div
                    v-for="type in section"
                    :key="`type-${type}`"
                    :ref="type"
                    class="timer__digit"
                    :class="type"
            >
                <span class="base" />
                <div class="flap over front" />
                <div class="flap over back" />
                <div class="flap under" />
            </div>
        </div>
    </div>
</template>

<script>
import './Timer.scss';

const DIGIT_TYPES = [
    [
        'ten-hour',
        'hour',
    ],
    [
        'ten-min',
        'min',
    ],
    [
        'ten-sec',
        'sec',
    ],
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
        flipTo(digitDom, value) {
            const currentValue = digitDom.dataset['value'];
            digitDom.dataset['value'] = value;
            digitDom.getElementsByClassName('front')[0].dataset['content'] = currentValue;
            digitDom.getElementsByClassName('back')[0].dataset['content'] = value;
            digitDom.getElementsByClassName('under')[0].dataset['content'] = value;

            for(const element of digitDom.getElementsByClassName('flap')) {
                element.style.display = 'block';
            }

            setTimeout(() => {
                digitDom.getElementsByClassName('base')[0].innerHTML = value;

                for(const element of digitDom.getElementsByClassName('flap')) {
                    element.style.display = 'none';
                }
            }, 350);
        },

        jumpTo(digitDom, value) {
            digitDom.dataset['value'] = value;
            digitDom.getElementsByClassName('base')[0].innerHTML = value;
        },

        updateGroup(group, value, flip) {
            const firstDigitDom = this.$refs['ten-'+group][0];
            const secondDigitDom = this.$refs[group][0];

            if (
                value === '0' &&
                firstDigitDom.dataset['value'] === '0' &&
                firstDigitDom.dataset['value'] === '0'
            ) {
                firstDigitDom.parentElement.style.display = 'none';
                firstDigitDom.style.display = 'none';
                secondDigitDom.style.display = 'none';
            } else {
                firstDigitDom.parentElement.style.display = 'flex';
                firstDigitDom.style.display = 'block';
                secondDigitDom.style.display = 'block';
            }

            if(value.length === 1) {
                value = `0${value}`;
            }

            const firstDigitValue = value.substr(0, 1);
            const secondDigitValue = value.substr(1, 1);

            if(firstDigitDom?.dataset['value'] !== firstDigitValue) {
                if(flip) {
                    this.flipTo(firstDigitDom, firstDigitValue);
                } else {
                    this.jumpTo(firstDigitDom, firstDigitValue);
                }
            }

            if(secondDigitDom?.dataset['value'] !== secondDigitValue) {
                if(flip) {
                    this.flipTo(secondDigitDom, secondDigitValue);
                } else {
                    this.jumpTo(secondDigitDom, secondDigitValue);
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
