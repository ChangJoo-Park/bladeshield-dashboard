<template>
  <v-layout align-center>
    <v-flex xs12 sm4 text-xs-center>
      <div>
        <v-btn color="error" @click="loginWith('google')">Login With Google</v-btn>
      </div>
      <div>
        <v-btn color="primary" @click="loginWith('github')">Login With Github</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'full',
  auth: false,
  methods: {
    loginWith (provider) {
      this.$auth.loginWith(provider)
    }
  }
}
</script>

<style>

</style>
