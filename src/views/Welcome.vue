<template>
	<main>
		<h1>Login Success</h1>

		<p>{{ welcomeMessage }}</p>
		<pre>{{ userInfo }}</pre>

		<router-link to="/update-profile">Update Profile</router-link>

		<br>

		<router-link to="/remove-account">Remove Account</router-link>

		<br>
		<br>

		<button @click="skapi.logout().then(()=>router.push('/'))">Logout</button>
	</main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

let userInfo = ref('');
let welcomeMessage = ref('');

onMounted(() => {
	/* 
        Get user profile and display it on the page.
    */
    skapi.getProfile().then(user => {
        if (user) {
			welcomeMessage.value = `Welcome, ${user.name || user.email || user.user_id}!`;

			userInfo.value = JSON.stringify(user, null, 2);
		}
    });
});
</script>