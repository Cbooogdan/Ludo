<template>
    <div
            class="home-start"
            :class="getPlayerClass"
            :style="homeStyle"
    >
        <div class="home-start__wrapper">
            <div
                    v-for="pawn in filteredPawns"
                    :key="'pawn-' + player + '-' + pawn.id"
                    class="home-start__pawn"
            >
                <pawn
                        v-if="pawn.player && showPawns"
                        :data="pawn"
                        :color="getPlayerColor"
                />
            </div>
        </div>

        <p class="home-start__name">
            {{ getPlayerName }}
        </p>
    </div>
</template>

<script>
import './HomeStart.scss';
import Pawn from '@/components/Pawn/Pawn';
import { mapGetters } from 'vuex';
import { PLAYERS } from '@/lookups/player';

export default {
    name: 'HomeStart',

    props: {
        player: {
            type: String,
            required: true
        },
        showPawns: {
            type: Boolean,
            default: false,
        }
    },

    components: {
        Pawn,
    },

    computed: {
        ...mapGetters({
            getPlayers: 'getPlayers',
            getCurrentPlayer: 'getCurrentPlayer',
        }),

        players() {
            return (player) => this.getPlayers(player);
        },

        filteredPawns() {
            return this.players(this.player)
                .pawns
                .map((pawn) => {
                    if (pawn.place.type === 'home') {
                        return pawn;
                    }

                    return {
                        id: pawn.id,
                        player: null
                    };
                });
        },

        getPlayerColor() {
            return this.players(this.player).color;
        },

        getPlayerName() {
            return this.players(this.player).name;
        },

        isCurrentPlayer() {
            return this.getCurrentPlayer === this.player;
        },

        homeStyle() {
            let margin = '';

            switch (this.player) {
                case PLAYERS.PLAYER_RED:
                    margin = '0 95px 95px 0';
                    break;
                case PLAYERS.PLAYER_BLUE:
                    margin = '0 0 95px 95px';
                    break;
                case PLAYERS.PLAYER_GREEN:
                    margin = '95px 95px 0 0';
                    break;
                case PLAYERS.PLAYER_YELLOW:
                    margin = '95px 0 0 95px';
                    break;
            }

            return {
                'margin': margin,
                'background-color': this.getPlayerColor,
            };
        },

        getPlayerClass() {
            let order = null;

            switch (this.player) {
                case PLAYERS.PLAYER_RED:
                    order = '-order-1';
                    break;
                case PLAYERS.PLAYER_BLUE:
                    order = '-order-2';
                    break;
                case PLAYERS.PLAYER_YELLOW:
                    order = '-order-4';
                    break;
                case PLAYERS.PLAYER_GREEN:
                    order = '-order-3';
                    break;
            }

            return {
                [order]: true,
                '-faded': !this.isCurrentPlayer,
            };
        }
    },
};
</script>
