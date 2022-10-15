<template>
    <div
            class="cell"
            :style="{...getPositionStyle, ...getColorStyle}"
            @drop="onDrop"
            @dragover.prevent
            @dragenter.prevent
            @dragend.prevent.stop
    >
        <pawn
                v-if="!isEmpty(getPawnForThisCell)"
                :data="getPawnForThisCell"
                :color="color"
        />
        <!--        {{ number }}-->
    </div>
</template>

<script>
import './Cell.scss';
import Pawn from '@/components/Pawn/Pawn';
import { isEmpty } from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { PLAYER_ACTIONS } from '@/lookups/player';
import { CELL_TYPE_TO_PLAYER, CELL_TYPES } from '@/lookups/cell';

const BASE_VALUE = 60;

export default {
    name: 'CellComponent',

    props: {
        number: {
            type: Number,
            required: true
        },

        type: {
            type: String,
            default: CELL_TYPES.NORMAL,
            validator(value) {
                return Object.values(CELL_TYPES).includes(value);
            }
        }
    },

    components: {
        Pawn,
    },

    data() {
        return {
            color: '',
            cellTypes: CELL_TYPES,
            cellTypeToPlayer: CELL_TYPE_TO_PLAYER,
        };
    },

    computed: {
        ...mapGetters({
            getPlayerColor: 'getPlayerColor',
            getMovingPawn: 'getMovingPawn',
            getCellPawn: 'getCellPawn',
            getCurrentAction: 'getCurrentAction',
        }),

        getColorStyle() {
            let backgroundColor = 'white';

            if (this.type !== this.cellTypes.NORMAL) {
                switch (this.type) {
                    case this.cellTypes.FINISH_BLUE:
                        backgroundColor = 'blue';
                        break;
                    case this.cellTypes.FINISH_GREEN:
                        backgroundColor = 'green';
                        break;
                    case this.cellTypes.FINISH_RED:
                        backgroundColor = 'red';
                        break;
                    case this.cellTypes.FINISH_YELLOW:
                        backgroundColor = 'yellow';
                        break;
                }

                return {
                    'background-color': backgroundColor,
                    'box-shadow': `0 0 7px 1px ${backgroundColor}`,
                };
            }

            switch (this.number) {
                case 1:
                    backgroundColor = 'red';
                    break;
                case 11:
                    backgroundColor = 'blue';
                    break;
                case 21:
                    backgroundColor = 'yellow';
                    break;
                case 31:
                    backgroundColor = 'green';
                    break;
                default:
                    backgroundColor = 'white';
                    break;
            }

            return {
                'background-color': backgroundColor,
                ...(backgroundColor === 'white' ? {} : {'box-shadow': `0 0 7px 1px ${backgroundColor}`}),
            };
        },

        getPositionStyle() {
            if (!this.number) {
                return {};
            }

            let topValue = 0;
            let leftValue = 0;

            if (this.type !== this.cellTypes.NORMAL) {
                switch (this.type) {
                    case this.cellTypes.FINISH_BLUE:
                        topValue = `${this.number * BASE_VALUE}px`;
                        leftValue = `${ 5 * BASE_VALUE }px`;
                        break;
                    case this.cellTypes.FINISH_GREEN:
                        topValue = `${(0 - (this.number - 10)) * BASE_VALUE}px`;
                        leftValue = `${ 5 * BASE_VALUE }px`;
                        break;
                    case this.cellTypes.FINISH_RED:
                        topValue = `${ 5 * BASE_VALUE }px`;
                        leftValue = `${(this.number) * BASE_VALUE}px`;
                        break;
                    case this.cellTypes.FINISH_YELLOW:
                        topValue = `${ 5 * BASE_VALUE }px`;
                        leftValue = `${(0 - (this.number - 10)) * BASE_VALUE}px`;
                        break;
                }

                return {
                    top: topValue,
                    left: leftValue,
                };
            }

            if ([1, 2, 3, 4, 5].includes(this.number)) {
                topValue = `${ 4 * BASE_VALUE }px`;
                leftValue = `${(this.number - 1) * BASE_VALUE}px`;
            }

            if ([6, 7, 8, 9].includes(this.number)) {
                topValue = `${(0 - (this.number - 9)) * BASE_VALUE}px`;
                leftValue = `${ 4 * BASE_VALUE }px`;
            }

            if ([10].includes(this.number)) {
                topValue = '0';
                leftValue = `${(this.number - 5) * BASE_VALUE}px`;
            }

            if ([11, 12, 13, 14].includes(this.number)) {
                topValue = `${(this.number - 11) * BASE_VALUE}px`;
                leftValue = `${ 6 * BASE_VALUE }px`;
            }

            if ([15, 16, 17, 18, 19].includes(this.number)) {
                topValue = `${ 4 * BASE_VALUE }px`;
                leftValue = `${(this.number - 9) * BASE_VALUE}px`;
            }

            if ([20].includes(this.number)) {
                topValue = `${(this.number - 15) * BASE_VALUE}px`;
                leftValue = `${ 10 * BASE_VALUE }px`;
            }

            if ([21, 22, 23, 24, 25].includes(this.number)) {
                topValue = `${ 6 * BASE_VALUE }px`;
                leftValue = `${(0 - (this.number - 31)) * BASE_VALUE}px`;
            }

            if ([26, 27, 28, 29].includes(this.number)) {
                topValue = `${(this.number - 19) * BASE_VALUE}px`;
                leftValue = `${ 6 * BASE_VALUE }px`;
            }

            if ([30].includes(this.number)) {
                topValue = `${ 10 * BASE_VALUE }px`;
                leftValue = `${(0 - (this.number - 35)) * BASE_VALUE}px`;
            }

            if ([31, 32, 33, 34].includes(this.number)) {
                topValue = `${(0 - (this.number - 41)) * BASE_VALUE}px`;
                leftValue = `${ 4 * BASE_VALUE }px`;
            }

            if ([35, 36, 37, 38, 39].includes(this.number)) {
                topValue = `${ 6 * BASE_VALUE }px`;
                leftValue = `${(0 - (this.number - 39)) * BASE_VALUE}px`;
            }

            if ([40].includes(this.number)) {
                topValue = `${(this.number - 35) * BASE_VALUE}px`;
                leftValue = '0';
            }

            return {
                top: topValue,
                left: leftValue,
            };
        },

        getPawnForThisCell() {
            return this.getCellPawn(this.type, this.number);
        },
    },

    methods: {
        ...mapActions({
            setPawnPlace: 'setPawnPlace',
            removeMovingPawn: 'removeMovingPawn',
            sendPawnHome: 'sendPawnHome',
            triggerNextStep: 'triggerNextStep',
        }),

        isEmpty,

        onDrop() {
            if (this.getCurrentAction !== PLAYER_ACTIONS.movePawn) {
                return;
            }

            const pawnData = this.getMovingPawn;

            if (
                this.type !== this.cellTypes.NORMAL &&
                pawnData.player !== this.cellTypeToPlayer[this.type]
            ) {
                return;
            }

            if (this.getPawnForThisCell) {
                this.sendPawnHome({
                    pawnId: this.getPawnForThisCell.id,
                    player: this.getPawnForThisCell.player
                });
            }

            this.color = this.getPlayerColor(pawnData.player);
            this.setPawnPlace({
                pawnId: pawnData.id,
                player: pawnData.player,
                place: {
                    type: this.type,
                    number: this.number,
                },
            });
            this.removeMovingPawn();
            this.triggerNextStep();
        }
    }
};
</script>
