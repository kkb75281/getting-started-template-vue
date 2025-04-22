<template>
	<main>
		<router-link to="/update-profile">Back</router-link>

		<h1>Email Verification</h1>
		
		<p>
			Please check your email for the verification code.
			<br>
			Enter the received code below and click verify.
		</p>

		<p>
			If you have not received the code, please check your spam folder.
			<br>
			Or click <a href="" @click.prevent="resend">HERE</a> to resend.
		</p>

		<br>

		<form @submit.prevent="verifyEmail">
			<div id="div_singleInput">
				<input type="text" name="code" placeholder="6 digits code">
				<input type="submit" value="Verify">
			</div>
		</form>
	</main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();
let user;

let resend = () => {
	let userConfirm = confirm(`We will send a verification email to ${user.email}. Continue?`);
	if (userConfirm) {
		skapi.verifyEmail()
			.then(()=>this.parentElement.innerHTML = 'Verification email has been sent.')
			.catch(err=>alert(err.message));
	}
}

let verifyEmail = (event) => {
	skapi.verifyEmail(event).then(r => {
		alert('Your email is verified.');
		router.push('/update-profile');
	}).catch(err=>alert(err.message))
}

onMounted(() => {
	skapi.getProfile().then(u => {
        if (u) {
            user = u;
        }
        else {
			router.push('/');
        }
    });
})
</script>