import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sessions from './components/Sessions.vue'
import AddressBook from './components/AddressBook.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home,
    }, {
        path: '/logout',
        component: Login
    }]
})
