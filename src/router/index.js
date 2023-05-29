import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AllDataView from '@/views/AllDataView.vue'
import DailyReportView from '@/views/DailyReportView.vue'
import WeeklyReportView from '@/views/WeeklyReportView.vue'
import ProfileView from '@/views/ProfileView.vue'
import store from '../store'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/BJqIzJc07Pzgcxh6AnZP',
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
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (token != "") {
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