<template>
    <main>
        <router-link to="/">Back</router-link>

        <section>
            <h1>Forgot Password</h1>

            <p>
                Input your login email address below and click on 'Submit'.
                <br>
                You will receive an email with a 6 digits verification code for resetting your password.
            </p>

            <p><strong>Note: </strong>If your account's email address is not verified, you will not be able to reset
                your
                password.</p>
        </section>

        <form @submit.prevent="forgotPassword">
            <input type="email" name="email" placeholder="your@account.email">
            <input type="submit" value="Submit">
        </form>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

let forgotPassword = (event) => {
    let email = event.target.email.value;

    skapi.forgotPassword(event).then(r => {
        router.push(`/reset-password#${email}`);
    }).catch(err => alert(err.message));
}
</script>