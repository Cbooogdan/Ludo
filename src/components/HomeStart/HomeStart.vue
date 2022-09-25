<template>
    <div
            class="home-start"
            :class="getPlayerBlockOrder(player)"
            :style="homeStyle"
    >
        <div class="home-start__wrapper">
            <div
                    v-for="pawn in filteredPawns"
                    :key="'pawn-' + player + '-' + pawn.id"
                    class="home-start__pawn"
            >
                <pawn
                        v-if="pawn.player"
                        :data="pawn"
                        :color="playerColor"
                />
            </div>
        </div>
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
        }
    },

    components: {
        Pawn,
    },

    computed: {
        ...mapGetters({
            getPlayers: 'getPlayers',
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

        playerColor() {
            return this.players(this.player).color;
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
                'background-color': this.playerColor,
            };
        },
    },

    methods: {
        getPlayerBlockOrder(player) {
            let order = null;

            switch (player) {
                case PLAYERS.PLAYER_RED:
                    return '-order-1';
                case PLAYERS.PLAYER_BLUE:
                    return '-order-2';
                case PLAYERS.PLAYER_YELLOW:
                    return '-order-4';
                case PLAYERS.PLAYER_GREEN:
                    return '-order-3';
            }

            return {
                'order': order,
            };
        }
    }
};
</script>
