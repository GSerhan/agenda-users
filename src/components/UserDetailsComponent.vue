<template>
    <div class="user-details">
        <div v-if="Object.keys(selectedUser).length !== 0">
            <h2>{{selectedUser.firstName}} {{selectedUser.lastName}}</h2>
            <p class="user-details-info">{{selectedUser.group}}</p>
        </div>
        <div class="user-details__buttons-container w-100">
            <div class="d-flex align-items-center justify-content-between">
                <button class="btn btn-primary cursor-pointer"
                        @click="getContact"
                        :class="{
                            disabled: Object.keys(selectedUser).length === 0
                        }"
                >Edit contact</button>
                <button class="btn btn-primary cursor-pointer"
                        @click="deleteContact"
                        :class="{
                            disabled: Object.keys(selectedUser).length === 0
                        }"
                >Delete contact</button>
            </div>
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
            // display edit contact modal
            getContact() {
                if(Object.keys(this.selectedUser).length !== 0) {
                    this.showEditContactModal = true;
                }
            },
            // edit user data
            editUser(value) {
                if(Object.keys(this.selectedUser).length !== 0) {
                    this.$store.dispatch('generalStore/setSelectedUserAction', value);
                    this.$toaster.success('User edited successfully');
                    this.showEditContactModal = false;
                }
            },
            // delete selected user data
            deleteContact() {
                if(Object.keys(this.selectedUser).length !== 0) {
                    this.$store.dispatch('generalStore/deleteContactAction');
                    this.$toaster.success('User deleted successfully');
                }
            }
        },
        mounted() {
            //if you want first user selected after you logged in
            // this.selectedUser = this.usersList[0];
        }
    }
</script>

<style scoped>

    .user-details__buttons-container {
        position: absolute;
        right: 0%;
        bottom: 30px;
        padding: 0 100px;
    }

    .user-details h2 {
        font-size: 3rem;
        text-transform: capitalize;
    }

    .user-details-info {
        font-weight: 500;
    }

</style>
