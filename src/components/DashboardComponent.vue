<template>
    <div class="dashboard d-flex align-items-center justify-content-start">
        <div>
            <users-list-component></users-list-component>
            <button @click="getContactModal" class="btn btn-primary">Add new contact</button>
        </div>
        <user-details-component
            v-if="Object.keys(selectedUser).length !== 0"
        ></user-details-component>
        <custom-modal-component
            v-if="showAddContactModal"
            :from = "'add'"
            :title = "'Add new contact'"
            :confirmButtonText = "'ok'"
            :cancelButtonText = "'cancel'"
            :colorConfirmButton = "'#007bff'"
            :colorCancelButton = "'transparent'"
            :customModalClass = "'create-modal'"
            :width = "326"
            :height = "'auto'"
            @getAction = "addUser"
            @closeModal = "showAddContactModal = false"
            @cancelAction = "showAddContactModal = false"
        ></custom-modal-component>
    </div>
</template>

<script>
    import {mapFields} from "vuex-map-fields";
    import UsersListComponent from "./UsersListComponent";
    import UserDetailsComponent from "./UserDetailsComponent";
    import CustomModalComponent from "./CustomModalComponent";

    export default {
        name: "DashboardComponent",
        components: {CustomModalComponent, UserDetailsComponent, UsersListComponent},
        data: function() {
            return {
                showAddContactModal: false
            }
        },
        methods: {
            getContactModal(){
                this.showAddContactModal = true;
            },
            addUser(value) {
                this.$store.dispatch('generalStore/addUserAction', value);
                this.$store.dispatch('generalStore/addFirstLetterAction', value.firstName.charAt(0));
                this.$toaster.success('User added successfully');
                this.showAddContactModal = false;
            }

        },
        computed: {
            ...mapFields(
                'generalStore',
                [
                    'usersList',
                    'logged',
                    'firstLetterUsers',
                    'selectedUser'
                ]
            )
        },
    }
</script>

<style scoped>


</style>
