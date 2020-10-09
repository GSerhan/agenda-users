<template>
    <div class="dashboard d-flex align-items-center justify-content-start">
        <div class="dashboard__left-side col-4 pt-4 pb-4 h-100">
            <users-list-component></users-list-component>
            <button @click="getContactModal" class="btn btn-primary btn--add-user cursor-pointer">Add new contact</button>
        </div>
        <div class="dashboard__right-side col-8 pt-4 pb-4 h-100">
            <user-details-component
            ></user-details-component>
        </div>
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

<style>
    .cursor-pointer {
        cursor: pointer;
    }
    .btn.disabled, .btn:disabled{
        pointer-events: none;
    }
</style>

<style scoped>

    .dashboard {
        border: 1px solid #64656F;
        height: calc(100vh - 60px);
    }

    .dashboard__left-side {
        border-right: 1px solid #64656F;
        overflow: scroll;
    }

    .btn--add-user {
        position: absolute;
        bottom: 30px;
        transform: translateX(-50%);
    }


</style>
