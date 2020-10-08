<template>
    <div>
        <div v-if="Object.keys(selectedFilter).length !== 0">
            <p>Filtred name: {{selectedFilter.name}}</p>
            <p>Filtred by: {{selectedFilter.group}}</p>
        </div>
        <div class="search-container">
            <input class="search-form" type="text" v-model="searchText" placeholder="Search" />
        </div>
        <div>
            <button @click="getAdvancedFiltersModal" class="btn btn-primary">Advanced filters</button>
        </div>
        <div class="d-flex align-items-start flex-column w-100" v-for="(firstLetter, index) in firstLetterUsers" :key="index">
            <div>{{firstLetter}}</div>
            <ul class="list p-0">
                <li class=""
                    v-for="(user, index) in resultSearch"
                    :key="index"
                    @click="showUserDetails(user)"
                >
                   <span v-if="firstLetter === user.firstName.charAt(0)">
                       {{user.firstName}} {{user.lastName}}
                   </span>
                </li>
            </ul>
        </div>
        <custom-modal-component
                v-if="showAdvancedFiltersModal"
                :from="'filters'"
                :title = "'Advanced filters'"
                :confirmButtonText = "'ok'"
                :cancelButtonText = "'cancel'"
                :colorConfirmButton = "'#007bff'"
                :colorCancelButton = "'transparent'"
                :customModalClass = "'edit-modal'"
                :width = "326"
                :height = "'auto'"
                @getAction = "applyFilters"
                @closeModal = "showAdvancedFiltersModal = false"
                @cancelAction = "showAdvancedFiltersModal = false"
        ></custom-modal-component>
    </div>
</template>

<script>
    import {mapFields} from "vuex-map-fields";
    import CustomModalComponent from "./CustomModalComponent";

    export default {
        name: "UsersListComponent",
        components: {CustomModalComponent},
        data: function() {
            return {
                searchText: null,
                showAdvancedFiltersModal: false
            }
        },
        methods: {
            showUserDetails(user) {
                this.$store.dispatch('generalStore/setSelectedUserAction', user);
            },
            getAdvancedFiltersModal() {
                this.showAdvancedFiltersModal = true;
            },
            applyFilters(value) {
                this.$store.dispatch('generalStore/selectedFilterAction', value);
                this.$toaster.success('Filters applied successfully');
                this.showAdvancedFiltersModal = false;
            }
        },
        computed: {
            resultSearch() {
                if(this.searchText) {
                    return this.usersList.filter((user) => {
                        return this.searchText.toLowerCase().split(' ').every(text => user.firstName.toLowerCase().includes(text) || user.lastName.toLowerCase().includes(text))
                    })
                } else {
                    return this.usersList;
                }
            },
            //this is if you want to disappear the letters on search

            // resultSearchLetter() {
            //     if(this.searchText) {
            //         return this.firstLetterUsers.filter((letter) => {
            //             return this.searchText.toLowerCase().split(' ').every(text => letter.toLowerCase().includes(text))
            //         })
            //     } else {
            //         return this.firstLetterUsers;
            //     }
            // },
            ...mapFields(
                'generalStore',
                [
                    'usersList',
                    'logged',
                    'firstLetterUsers',
                    'selectedUser',
                    'selectedFilter'
                ]
            )
        },
    }
</script>

<style scoped>
    .dashboard .list {
        list-style: none;
        text-align: left;
    }

</style>
