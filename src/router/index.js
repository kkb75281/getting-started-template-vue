import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
		},
		{
			path: '/signup-success',
			name: 'signup-success',
			component: () => import('../views/SignupSuccess.vue'),
		},
		{
			path: '/welcome',
			name: 'welcome',
			component: Welcome,
		},
		{
			path: '/update-profile',
			name: 'update-profile',
			component: () => import('../views/UpdateProfile.vue'),
		},
		{
			path: '/email-verification',
			name: 'email-verification',
			component: () => import('../views/EmailVerification.vue'),
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: () => import('../views/ForgotPassword.vue'),
		},
		{
			path: '/change-password',
			name: 'change-password',
			component: () => import('../views/ChangePassword.vue'),
		},
		{
			path: '/reset-password',
			name: 'reset-password',
			component: () => import('../views/ResetPassword.vue'),
		},
		{
			path: '/remove-account',
			name: 'remove-account',
			component: () => import('../views/RemoveAccount.vue'),
		},
		{
			path: '/recover-account',
			name: 'recover-account',
			component: () => import('../views/RecoverAccount.vue'),
		},
	],
})

export default router