<template>
    <div class="login">
        <div class="d-flex align-items-center justify-content-center">
            <div>
                <div class="form-group">
                    <label for="exampleInputEmail1">User</label>
                    <input class="form-control" id="exampleInputEmail1" v-model="user">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your user with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button @click="submitUser" class="btn btn-primary">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapFields} from "vuex-map-fields";

    export default {
        name: "LoginComponent",
        data: function() {
            return {
                user: '',
                password: ''
            }
        },
        methods: {
            //submit user data for login
            submitUser() {
                if(!this.user.length || !this.password.length) {
                    this.$toaster.error('Please complete your data');
                    return false;
                } else {
                    this.$store.dispatch('generalStore/setLoggedAction', true);
                }

            }
        },
        computed: {
            ...mapFields(
                'generalStore',
                [
                    'logged',
                ]
            )
        },
    }
</script>

<style scoped>


</style>
