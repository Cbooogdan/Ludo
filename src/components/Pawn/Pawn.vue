<template>
    <div
            class="pawn"
            :style="styles"
            :draggable="canIMove"
            @dragstart="startDrag($event)"
            @dragend="leaveDrag($event)"
            @dragover.stop
    >
        <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                class="pawn__image"
        >
            <path
                    d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c
                    0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03
                    28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21
                    -1.79,-4 -4,-4 z"
                    :style="pawnStyle"
            />
        </svg>

        <!--        {{ data.id }}-->
    </div>
</template>

<script>
import './Pawn.scss';
import { mapActions, mapGetters } from 'vuex';
import { PLAYER_ACTIONS } from '@/lookups/player';

export default {
    name: 'PawnComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
        color: {
            type: String,
            required: true,
        }
    },

    computed: {
        ...mapGetters({
            getMovingPawn: 'getMovingPawn',
            getCurrentPlayer: 'getCurrentPlayer',
            getCurrentAction: 'getCurrentAction',
        }),

        styles() {
            return {
                'cursor': this.canIMove ? 'pointer' : 'default',
            };
        },

        pawnStyle() {
            return {
                'opacity': '1',
                'fill': this.color,
                'fill-opacity': '1',
                'fill-rule': 'nonzero',
                'stroke': '#000000',
                'stroke-width': '1.5',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'miter',
                'stroke-miterlimit': '4',
                'stroke-dasharray': 'none',
                'stroke-opacity': '1',
            };
        },

        canIMove() {
            return this.getCurrentPlayer === this.data?.player &&
                this.getCurrentAction === PLAYER_ACTIONS.movePawn;
        }
    },

    methods: {
        ...mapActions({
            setMovingPawn: 'setMovingPawn',
            removeMovingPawn: 'removeMovingPawn',
            resetMovingPawn: 'resetMovingPawn',
        }),

        startDrag (event) {
            if (this.getCurrentAction !== PLAYER_ACTIONS.movePawn) {
                return;
            }

            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('pawnId', this.data.id);
            event.dataTransfer.setData('pawnPlayer', this.data.player);
            event.dataTransfer.setData('pawnPlace', this.data.place);

            setTimeout(() => {
                this.setMovingPawn({
                    pawnId: Number(this.data.id),
                    player: this.data.player,
                });
                event.target.style.display = 'none';
            }, 0);
        },

        leaveDrag(event) {
            if (this.getMovingPawn) {
                event.target.style.display = 'block';
                this.resetMovingPawn();
                this.removeMovingPawn();
            }
        },
    }
};
</script>
