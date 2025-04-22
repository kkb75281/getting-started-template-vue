<template>
	<main>
		<router-link to="/update-profile">Back</router-link>

		<h1>Change Password</h1>

		<form @submit.prevent="changePassword">
			<table>
				<tbody>
					<tr>
						<td>
							Current Password
						</td>
						<td>
							<input type="password" name="current_password" placeholder="At least 6 characters">
						</td>
					</tr>
					<tr>
						<td>
							New Password
						</td>
						<td>
							<input type="password" name="new_password" placeholder="At least 6 characters">
						</td>
					</tr>
					<tr>
						<td></td>
						<td style="text-align: right;">
							<br>
							<input type="submit" value="Change">
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

let changePassword = (event) => {
	skapi.changePassword(event).then(() => {
		alert('Password has been changed.');
		router.push('/update-profile');
	}).catch(err=>alert(err.message));
}

onMounted(() => {
	skapi.getProfile().then(user => {
        if (!user) {
			router.push('/');
		}
    });
})
</script>