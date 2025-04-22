<template>
	<main>
		<router-link to="/">Back</router-link>

		<h1>Reset Password</h1>

		<p>Enter the 6 digits verification code you may have received in your email and set new password below.</p>

		<p>
			If you have not received the code,
			please check your spam folder.
			<br>
			Or click <a href='' @click.prevent="resend">HERE</a> to resend.
		</p>

		<form @submit.prevent="resetPassword">
			<input type="email" name="email" placeholder="E-Mail" required hidden>
			<table>
				<tbody>
					<tr>
						<td>Code</td>
						<td>
							<input type="text" name="code" placeholder="6 digits code" required>
						</td>
					</tr>
					<tr>
						<td>New Password</td>
						<td>
							<input type="password" name="new_password" placeholder="New Password" required>
						</td>
					</tr>
					<tr>
						<td></td>
						<td style="text-align:right">
							<br>
							<input type="submit" value="Change Password">
						</td>
					</tr>
				</tbody>
			</table>
		</form>

		<p><strong>Note: </strong>If your account's email address is not verified, you will not be able to reset your
			password.</p>
	</main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();

let email = location.hash.slice(1);

let resend = () => {
	/*
		When this is clicked, we will manually execute the skapi.forgotPassword() method to re-send the verification code to the user's email address.
		When successful, we will replace the content of the parent element of this element with a message: Verification code has been sent.
	*/
	let userConfirm = confirm(`We will send a verification code to ${email}. Continue?`);
	if (userConfirm) {
		skapi.forgotPassword({email}).then(() => {
			this.parentElement.innerHTML = 'Verification code has been sent.'
		}).catch(err => alert(err.message) );
	}
}

let resetPassword = (event) => {
	skapi.resetPassword(event).then(()=> {
		alert('Password has been reset.');
		router.push('/login');
	}).catch(err=>alert(err.message))
}

onMounted(() => {
	/*
		The email address is passed from the forgot password page.
		We can get the email address from the hash of the url.
		The hash is the part of the url after the # sign.
		We can get the hash using location.hash.
		Then, we can set the value of the email input field for the user.
		Email input field is hidden but it is required for the reset password method.
	*/
	document.querySelector('input[name=email]').value = email;
})
</script>