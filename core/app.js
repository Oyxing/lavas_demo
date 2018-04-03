/**
 * @file entry
 * @author oyx(897346175@qq.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import Axios from 'axios';
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Vuetify from 'vuetify';

Vue.use(Meta);
Vue.use(VueAxios,Axios)
Vue.use(VueJsonp);
Vue.use(Vuetify);

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
