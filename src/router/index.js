import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AllDataView from '@/views/AllDataView.vue'
import DailyReportView from '@/views/DailyReportView.vue'
import WeeklyReportView from '@/views/WeeklyReportView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ManageUserView from '@/views/ManageUserView.vue'
import store from '../store'
import axios from 'axios'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/',
        component: DashboardLayout,
        meta: { requireAuth: true },
        children: [
            {
                path: '/',
                name: 'All Data',
                component: AllDataView
            },
            {
                path: 'daily',
                name: 'Daily Report',
                component: DailyReportView
            },
            {
                path: 'weekly',
                name: 'Weekly Report',
                component: WeeklyReportView
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfileView
            },
            {
                path: 'users',
                name: 'Manage Users',
                component: ManageUserView
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    const token = store.getters['user/getToken']
    const expiredMillis = store.getters['user/getExpirationMillis']
    const currentMillis = Date.now()
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (token != "" && expiredMillis >= currentMillis) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
            axios.defaults.headers['x-refresh-token'] = token.refreshToken
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

Vue.use(VueRouter)

export default router