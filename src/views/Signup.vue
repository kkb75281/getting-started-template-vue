<template>
    <main>
        <router-link to="/">Back</router-link>

        <!--
			When signup_confirmation option is set to true,
			User will be required to confirm their email address before they can login.
            -->
        <form @submit="signup">
            <h1>Sign Up</h1>

            <label for="email">Login Email</label>
            <input name="email" placeholder="your@email.com" required />

            <label for="password">Set Password</label>
            <input type="password" name="password" minlength="6" placeholder="At least 6 characters" required />

            <label for="name">Your Name</label>
            <input name="name" placeholder="Your name (required)" required />
            <br />

            <button type="submit">Sign Up</button>

            <div style="text-align: center; margin-top: 10px">
                <small>
                    <router-link to="/login">Already have an account?</router-link>
                </small>
            </div>
        </form>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

let signup = (event) => {
    /*
        When the user clicks on the signup button, it will call the signup function.
        The signup function will send a request to the server to create a new user.
        If the request is successful, it will redirect the user to the signup success page.
    */
    skapi.signup(event, { signup_confirmation: true }).then(() => {
        router.push('/signup-success');
    }).catch(err => alert(err.message));
}

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