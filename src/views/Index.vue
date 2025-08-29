<template>
	<main>
		<h1>Index</h1>
		<p>
			This is a HTML template for authentication features using <a href='https://www.skapi.com'>Skapi</a>.
			<br>
			No CSS is used in this template. So don't let the design fool you.
			<br>
			This template packs full solid authentication features you can use in your HTML application.
		</p>
		<router-link to="/login">Login</router-link>
		|
		<router-link to="/signup">Sign-Up</router-link>
	</main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

onMounted(() => {
	/*
        Check if the user is logged in.
        If the user is logged in, redirect the user to welcome page.
    */
	skapi.getProfile().then(user => {
        if (user) {
            router.push('/welcome');
        }
    });
});
</script>