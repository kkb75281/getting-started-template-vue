<template>
	<main>
		<h1>Login Success</h1>

		<p id="WelcomeMessage"></p>
		<pre id="UserInfo"></pre>

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
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

onMounted(() => {
	/* 
        Get user profile and display it on the page.
    */
    skapi.getProfile().then(user => {
        if (user) {
            let welcomeMessage = document.getElementById("WelcomeMessage");
            if (welcomeMessage) {
                welcomeMessage.innerHTML = `Welcome, ${user.name || user.email || user.user_id}!`;
            }

            let userInfo = document.getElementById("UserInfo");
            if (userInfo) {
                userInfo.innerHTML = JSON.stringify(user, null, 2);
            }
        }
    });
});
</script>