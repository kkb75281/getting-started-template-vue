<template>
	<main>
		<router-link to="/welcome">Back</router-link>

		<h1>Remove Account</h1>
		
		<h3>Would you like to remove your account?</h3>
		<p>
			Once you remove your account, your account will still be recoverable within 6 months by logging in and
			verifing your email address.
			<br>
			After 6 months, all your data will be deleted and cannot be recovered.
		</p>
		<p><strong>Note: </strong>Your account cannot be recovered if you have not verified your email address.</p>
		<p>If you like to proceed, please click the button below.</p>

		<form @submit="disableAccount">
			<input type="submit" value="Remove Account">
		</form>
	</main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

let disableAccount = (event) => {
	skapi.disableAccount(event).then(() => {
		alert('Your account is removed.');
		router.push('/');
	}).catch(err=>alert(err.message));
}

onMounted(() => {
	skapi.getProfile().then(u => {
        if (!u) {
            router.push('/');
        }
    });
})
</script>