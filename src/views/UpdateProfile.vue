<template>
    <main>
        <router-link to="/welcome">Back</router-link>

        <h1>Update Profile</h1>

        <form @submit.prevent="updateProfile">
            <table>
                <tbody>
                    <tr>
                        <td>
                            Login Email
                        </td>
                        <td>
                            <input id='input_email' name="email" placeholder='your@email.com' required>
    
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Your name
                        </td>
                        <td>
                            <input id='input_name' name="name" placeholder='Your name (required)' required>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Birthday
                        </td>
                        <td>
                            <input id='input_birthdate' name="birthdate" type="date">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email to Public
                        </td>
                        <td>
                            <input id='input_emailPublic' name="email_public" type="checkbox">
                            <small>(Email verification required)</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email Verified
                        </td>
                        <td>
                            <span id="span_emailVerified"></span>
                            <button @click.prevent="verifyEmail">
                                (Click to verify your email)
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                        </td>
                        <td>
                            <!--
                                When the user clicks the link below, it will open the change-password.html page, where the user can change their password.
                            -->
                            <router-link to="/change-password">Change Password</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td style="text-align: right;">
                            <br>
    
                            <input type="submit" value="Update">
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { skapi } from '../main.js';

const router = useRouter();
let user = ref(null);

let updateProfile = (event) => {
    /*
        skapi.updateProfile() will update the user profile with the provided data.
        If the update is successful, it will redirect the user to welcome.html page.
        If the update is unsuccessful, it will show an alert with the error message.
    */
    skapi.updateProfile(event).then(r => {
        router.push('/welcome');
    }).catch(err=>alert(err.message));
}

let verifyEmail = () => {
    /*
        When the user clicks on (Click to verify your email), it will ask user to received a verification email.
        If the user confirms, it will send a verification email to the user.
        Then, the user will be redirected to the email-verification.html page where the user can enter the verification code to verify their email address.
    */
    let userConfirm = confirm(`We will send a verification email to ${user.email}. Continue?`);
    if(userConfirm) {
        skapi.verifyEmail().then(() => router.push('/email-verification')).catch(err => alert(err => alert(err.message)) );
    }
}

onMounted(() => {
    skapi.getProfile().then(u => {
        if (!u) {
            /*
                If the user is not logged in, redirect the user to the index.html page.
            */
            router.push('/');
            return;
        }

        /*
            Set the user variable.
            This variable can also be used when the user clicks on the email verification link.
        */
        user.value = u;
        console.log(user.value);

        input_email.value = user.value.email;
        input_name.value = user.value.name;
        input_birthdate.value = user.value.birthdate || "";

        span_emailVerified.classList.add(user.value.email_verified);
        if (!user.value.email_verified) {
            /*
                If the user's email is not verified, we will disable the email public checkbox.
                User needs to verify their email before they can make their email public.
            */
            input_emailPublic.disabled = true;
        }

        /*
            Set the email public checkbox to checked if the user's email is public and verified.
        */
        input_emailPublic.checked = user.value.email_public && user.value.email_verified;
    });
});
</script>

<style scoped>
/*
    Disable the checkbox if the user's email is not verified.
    Hide the preceding <small> tag noting 'Email verification required' if the checkbox is enabled.
*/
#input_emailPublic:not([disabled])+small {
    display: none;
}

/*
    Use css to show the email verification status dynamically.
    Show 'Yes' if the email is verified and 'No' if the email is not verified.
    Hide the preceding clickable small tag (Click to verifiy your email) if the email is verified.
*/
#span_emailVerified.false::before {
    content: 'No';
    display: inline-block;
}

#span_emailVerified.true::after {
    content: 'Yes';
}

#span_emailVerified.true+button {
    display: none;
}
</style>