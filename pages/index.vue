<template>
  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
    </v-flex>
    <template v-if="$auth.loggedIn">
      <v-btn small :to="{ name: 'app' }">앱으로</v-btn>
      <v-btn small @click.native="$auth.logout()">로그아웃</v-btn>
    </template>
    <template v-else>
      <v-btn small :to="{ name: 'auth-login' }">Login</v-btn>
    </template>


  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'full',
  auth: false,
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
