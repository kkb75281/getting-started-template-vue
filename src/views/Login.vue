<template>
    <main>
        <router-link to="/">Back</router-link>

        <form @submit="login">
            <h1>Login</h1>

            <label for="email">Email</label>
            <input name="email" placeholder="your@email.com" required />

            <label for="password">Password</label>
            <input type="password" name="password" minlength="6" placeholder="At least 6 characters" required />

            <br />

            <button type="submit">Login</button>

            <div style="text-align: center; margin-top: 10px">
                <small>
                    <router-link to="/signup">Don't have an account?</router-link>
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

let login = (event) => {
    /*
        If the login is successful, it will redirect the user to the welcome.html page.
        If the login is unsuccessful, it will show an alert with the error message.
    */
    skapi.login(event).then(r => {
        router.push('/welcome');
    }).catch(async err => {
        if (err.code === 'USER_IS_DISABLED') {
            /*
                If the user account is disabled, you can ask the user if they want to recover their account.
                If they do, we will call skapi.recoverAccount() to send a recovery email to the user.
                Then we will redirect the user to the authentication/recover-account.html page that gives the user instructions to recover their account.
            */
            let recover = confirm('Your account is disabled. Would you like to recover your account?');
            if (recover) {
                await skapi.recoverAccount();
                router.push('/recover-account');
                return;
            }
        } else {
            alert(err.message);
        }
    });
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