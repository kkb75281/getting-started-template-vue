<template>
    <main>
        <h1>Skapi Vue Starter Template</h1>
        <p>This is a Vue.js starter template integrated with Skapi.</p>
        <p>It includes basic features for your Vue application:</p>
        <ul>
            <li>Signup</li>
            <li>Signup email verification</li>
            <li>Login</li>
        </ul>

        <br>

        <p style="font-weight: bold;">Login or Sign-up below:</p>
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