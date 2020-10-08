import Vue from 'vue';
import Vuex from 'vuex';
import generalStore from './modules/generalStore';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        strict: false,

        modules: {
            generalStore,
        }

    })
