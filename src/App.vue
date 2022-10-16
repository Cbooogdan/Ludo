<template>
    <div
            id="app"
            class="app"
    >
        <!--        <div class="nav">-->
        <!--            <router-link to="/">-->
        <!--                Home-->
        <!--            </router-link>-->
        <!--        </div>-->
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'AppMain',

    mounted() {
        document.title = 'Ludo';
    }
};
</script>

<style lang="scss">
    @import 'App';
</style>
