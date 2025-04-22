<template>
	<main>
		<router-link to="/">Back</router-link>

		<h1>Sign Up</h1>
		<!--
			When signup_confirmation option is set to true,
			User will be required to confirm their email address before they can login.
		-->
		<form @submit.prevent="signup">
			<table>
				<tbody>
					<tr>
						<td>Login Email</td>
						<td>
							<input name="email" placeholder='your@email.com' required>
						</td>
					</tr>
					<tr>
						<td>Set Password</td>
						<td>
							<input type="password" name="password" minlength="6" placeholder='At least 6 characters' required>
						</td>
					</tr>
					<tr>
						<td>Your Name</td>
						<td>
							<input name="name" placeholder='Your name (required)' required>
						</td>
					</tr>
					<tr>
						<td></td>
						<td style="text-align:right">
							<small><router-link to="/login">Already have an account?</router-link></small>
							<br>
							<br>
							<input type="submit" value="Sign Up">
						</td>
					</tr>
				</tbody>
			</table>
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