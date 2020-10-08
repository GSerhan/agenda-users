<template>
    <div class="custom-modal"
         :class="customModalClass"
    >
        <div class="container">
            <div class="custom-modal-overlay" @click="closeModal"></div>
            <div class="custom-modal__inner position-relative"
                 :style="modalWidthHeight"
            >
                <div class="custom-modal__header">
                    <h5 class="mb-0" v-html="title"></h5>
                </div>
                <div class="custom-modal__content">
                    <form v-if="from !='filters'">
                        <label for="fname">First name:</label>
                        <input type="text" id="fname" name="fname" v-model="newUser.firstName">
                        <label for="lname">Last name:</label>
                        <input type="text" id="lname" name="lname" v-model="newUser.lastName">
                    </form>
                    <form v-else>
                        <label for="filterName">Name filter:</label>
                        <input type="text" id="filterName" name="filterName" v-model="filter.name">
                    </form>
                    <div class="custom-modal-selector d-flex align-items-center justify-content-between">
                        <span>Group:</span>
                        <Multiselect
                                :clearable="false"
                                :class="'custom-multiselect'"
                                :options=groups
                                v-model=selectedGroup
                                :value=selectedGroup
                                :multiple="false"
                                :show-labels="false"
                                :group-select="false"
                                :option-height="20"
                                placeholder="Search for a group"
                                track-by="id"
                                label="value"
                        ></Multiselect>
                    </div>
                    <div class="custom-modal-buttons">
                        <button class="btn btn--cancel"
                                :style="cancelButtonColor"
                                @click="cancelAction"
                        >{{cancelButtonText}}</button>
                        <button class="btn btn--confirm"
                                :style="confirmButtonColor"
                                @click="getAction">{{confirmButtonText}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect';
    import {mapFields} from "vuex-map-fields";

    export default {
        name: "CustomModalComponent",
        components: {Multiselect},
        props: {
            title: {
                type: String,
                default: ""
            },
            from: {
                type: String,
                default: ''
            },
            confirmButtonText: {
                type: String,
                default: "confirm"
            },
            cancelButtonText: {
                type: String,
                default: "cancel"
            },
            customModalClass: {
                type: String,
                default: "modal-superbet"
            },
            width: {
                default: '50%'
            },
            height: {
                default: 'auto'
            },
            colorConfirmButton: {
                type: String,
                default: '#64C046'
            },
            colorCancelButton: {
                type: String,
                default: 'transparent'
            },
        },
        data: function () {
            return {
                colorModal: "blue",
                newUser: {
                    firstName: '',
                    lastName: '',
                    group: ''
                },
                selectedGroup: {},
                filter: {
                    name: '',
                    group: ''
                }
            }
        },
        watch: {
            selectedGroup(to) {
                console.log('to', to);
                if(to === null) {
                    this.newUser.group = 'others';
                    this.filter.group = 'others';
                } else {
                    this.newUser.group = to.value;
                    this.filter.group = to.value;
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit('closeModal', false);
            },
            cancelAction() {
                this.$emit('cancelAction', false);
            },
            getAction() {
                if(this.from === 'filters') {
                    this.$emit('getAction', this.filter);
                } else {
                    this.$emit('getAction', this.newUser);
                }
            },
        },
        computed: {
            ...mapFields(
                'generalStore',
                [
                    'usersList',
                    'logged',
                    'firstLetterUsers',
                    'selectedUser',
                    'groups'
                ]
            ),
            modalWidthHeight() {
                return {
                    '--width':  isNaN(this.width) ? this.width : this.width + 'px',
                    '--height':  isNaN(this.height) ? this.height : this.height + 'px'
                }
            },
            confirmButtonColor() {
                return '--background:' + this.colorConfirmButton;
            },
            cancelButtonColor() {
                return '--background:' + this.colorCancelButton;
            }
        },
        mounted() {
            this.selectedGroup = this.groups[0];
            if(this.from === 'edit') {
                this.newUser = this.selectedUser;
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    .custom-modal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: transparent;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        justify-content: space-around;
        z-index: 10000;
    }
    .custom-modal__inner {
        position: relative;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px rgba(151, 151, 151, 0.4);
        border-radius: 6px;
        margin: 0 auto;
        z-index: 10001;
        width: var(--width);
        height: var(--height);
    }
    .custom-modal-overlay {
        position: absolute;
        background-color: rgba(73, 73, 73, 0.5);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 10000;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .custom-modal-buttons.textRight {
        text-align: right;
    }
    .custom-modal-buttons.textCenter {
        text-align: center;
    }
    .custom-modal__header h5 {
        font-size: 0.875rem;
        color: #494949;
        padding: 22px 25px;
        border-bottom: 1px solid #E4E8EF;
    }
    .custom-modal__content p {
        font-size: 1rem;
        color: #64656F;
        padding: 22px 25px;
        border-bottom: 1px solid #E4E8EF;
        line-height: 2;
    }
    .custom-modal-buttons {
        padding: 14px 25px;
    }
    .custom-modal-buttons .btn--cancel {
        font-size: 0.875rem;
        color: #525252;
        height: 28px;
        width: 100px;
        text-transform: capitalize;
        line-height: 1;
        background-color: var(--background);
    }
    .custom-modal-buttons .btn--confirm {
        min-width: 125px;
        height: 28px;
        border-radius: 4px;
        text-transform: capitalize;
        line-height: 1;
        font-size: 0.875rem;
        color: #FFFFFF;
        background-color: var(--background);
    }
    .custom-modal__header .custom-modal-close-icon {
        right: 25px;
        top: 20px;
    }

    .custom-modal__content > p {
        max-height: calc(100vh - 500px);
        overflow: auto;
    }

    .custom-modal-selector {
        padding-left: 65px;
        padding-right: 35px;
    }
</style>
