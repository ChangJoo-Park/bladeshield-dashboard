<template>
  <v-layout align-center>
    <v-flex xs12 sm4 text-xs-center>
      <div>
        <v-btn color="error" @click="loginWith('google')">Login With Google</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'full',
  auth: false,
  methods: {
    async loginWith (provider) {
      try {
        const result = await this.$auth.loginWith(provider)
        console.log(result)
        this.$toast.success('Success Login', {icon: "error_outline"})
      } catch (error) {
        console.log(error)
        this.$toast.error('Failed Logging In', {icon: "error_outline"})
      }
    }
  }
}
</script>

<style>

</style>
