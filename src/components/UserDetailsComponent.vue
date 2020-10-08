<template>
    <div>
        <div>
            <h2>{{selectedUser.firstName}}</h2>
            <h2>{{selectedUser.lastName}}</h2>
            <p>{{selectedUser.group}}</p>
        </div>
        <div>
            <button @click="getContact" class="btn btn-primary">Edit contact</button>
            <button @click="deleteContact" class="btn btn-primary">Delete contact</button>
        </div>
        <custom-modal-component
                v-if="showEditContactModal"
                :from="'edit'"
                :title = "'Edit contact'"
                :confirmButtonText = "'ok'"
                :cancelButtonText = "'cancel'"
                :colorConfirmButton = "'#007bff'"
                :colorCancelButton = "'transparent'"
                :customModalClass = "'edit-modal'"
                :width = "326"
                :height = "'auto'"
                @getAction = "editUser"
                @closeModal = "showEditContactModal = false"
                @cancelAction = "showEditContactModal = false"
        ></custom-modal-component>
    </div>
</template>

<script>
    import {mapFields} from "vuex-map-fields";
    import CustomModalComponent from "./CustomModalComponent";

    export default {
        name: "UserDetailsComponent",
        components: {CustomModalComponent},
        data: function() {
            return {
                showEditContactModal: false
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
        methods: {
            getContact() {
                this.showEditContactModal = true;
            },
            editUser(value) {
                this.$store.dispatch('generalStore/setSelectedUserAction', value);
                this.$toaster.success('User edited successfully');
                this.showEditContactModal = false;
            },
            deleteContact() {
                this.$store.dispatch('generalStore/deleteContactAction');
                this.$toaster.success('User deleted successfully');
            }
        },
        mounted() {
            //if you want first user selected after you logged in

            // this.selectedUser = this.usersList[0];
        }
    }
</script>

<style scoped>

</style>
