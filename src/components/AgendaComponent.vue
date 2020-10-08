<template>
    <div class="container">
        <login-component
            v-if="!logged"
        ></login-component>
        <dashboard-component v-else></dashboard-component>
    </div>
    
</template>

<script>
    import LoginComponent from "./LoginComponent";
    import DashboardComponent from "./DashboardComponent";
    import {mapFields} from "vuex-map-fields";

    export default {
        name: "AgendaComponent",
        components: {DashboardComponent, LoginComponent},
        computed: {
            ...mapFields(
                'generalStore',
                [
                    'usersList',
                    'logged'
                ]
            )
        },
    }
</script>

<style scoped>

</style>
