import {getField, updateField} from "vuex-map-fields";

//user list
const getUsersList = () => {
    return [
        {
            "firstName" : "al" ,
            "lastName" : "pacino" ,
            "group" : "friends"
        },
        {
            "firstName" : "alain" ,
            "lastName" : "delon" ,
            "group" : "friends"
        },
        {
            "firstName" : "anthony" ,
            "lastName" : "hopkins" ,
            "group" : "work"
        },
        {
            "firstName" : "brad" ,
            "lastName" : "pitt" ,
            "group" : "friends"
        },
        {
            "firstName" : "joaquin" ,
            "lastName" : "phoenix" ,
            "group" : "work"
        },
        {
            "firstName" : "matt" ,
            "lastName" : "damon" ,
            "group" : "friends"
        },
        {
            "firstName" : "michael" ,
            "lastName" : "caine" ,
            "group" : "others"
        },
        {
            "firstName" : "morgan" ,
            "lastName" : "freeman" ,
            "group" : "work"
        },
        {
            "firstName" : "tommy" ,
            "lastName" : "lee jones" ,
            "group" : "family"
        }
    ]
};

const users = getUsersList();
const firstNameUsers = [];
const firstLetterUsers = [];
const groupArray = [];
const groupUnique = [];

// extract firstName Users
users.forEach(user => {
    firstNameUsers.push(user.firstName);
});

//extract firstLetter Users
firstNameUsers.forEach(letter => {
    firstLetterUsers.push(letter.charAt(0))
});

//remove duplicates from firstLetter ES6 version
const uniqueSet = new Set(firstLetterUsers);
const backToArray = [...uniqueSet];
//sort ascending
backToArray.sort(function (a, b) {
    return a.localeCompare(b);
});

//extract group from usersList
users.forEach(user => {
    groupArray.push(user.group);
});

const uniqueGroups = new Set(groupArray);
const backToGroupsArray = [...uniqueGroups];

backToGroupsArray.forEach((group, index) => {
    groupUnique.push(
         {
             id: index,
             value: group
         }
     )
});

const getFirstLetter = () => {
    return backToArray;
};

const getGroups = () => {
    return groupUnique;
};

export default {
    namespaced:true,
    name: 'generalStore',
    state: {
        logged: false,
        firstLetterUsers: getFirstLetter(),
        usersList: getUsersList(),
        selectedUser: {},
        groups: getGroups(),
        selectedFilter: {}

    },
    getters: {
        getField,
        usersList(state) {
            return state.usersList;
        },
        logged(state) {
            return state.logged;
        },
        firstLetterUsers(state) {
            return state.firstLetterUsers;
        },
        selectedUser(state) {
            return state.selectedUser;
        },
        groups(state) {
            return state.groups;
        },

    },
    mutations: {
        updateField,
        setUsersList(state, data) {
            state.usersList = data;
        },
        setLogged(state, data) {
            state.logged = data;
        },
        setFirstLetterUsers(state, data) {
            state.firstLetterUsers = data;
        },
        setSelectedUser(state, data) {
            state.selectedUser = data;
        },
        setGroups(state, data) {
            state.groups = data;
        },
        setAddUser(state, data) {
            state.usersList.push(data);
        },
        setAddFirstLetter(state, data) {
            const lettersArray = state.firstLetterUsers.filter(letter => {
                    return letter === data
            });
            if(lettersArray.length === 0) {
                state.firstLetterUsers.push(data);
            }
        },
        setDeleteContact(state) {
            let index = state.usersList.findIndex(user => user.firstName === state.selectedUser.firstName);
            state.usersList.splice(index, 1);
            state.selectedUser = {};
        },
        setSelectedFilter(state, data) {
            state.selectedFilter = data;
            const arrayFilters = state.usersList.filter(user => user.group === data.group);
            console.log('arrayFilters', arrayFilters);
            state.usersList = arrayFilters;
        }

    },
    actions: {
        setUsersListAction(context, data) {
            context.commit('setUsersList', data);
        },
        setLoggedAction(context, data) {
            context.commit('setLogged', data);
        },
        setFirstLetterUsersAction(context, data) {
            context.commit('setFirstLetterUsers', data);
        },
        setSelectedUserAction(context, data) {
            context.commit('setSelectedUser', data);
        },
        setGroupsAction(context, data) {
            context.commit('setGroups', data);
        },
        addUserAction(context, data) {
            context.commit('setAddUser', data);
        },
        addFirstLetterAction(context, data) {
            context.commit('setAddFirstLetter', data);
        },
        deleteContactAction(context, data) {
            context.commit('setDeleteContact', data);
        },
        selectedFilterAction(context, data) {
            context.commit('setSelectedFilter', data);
        }
    }
}

