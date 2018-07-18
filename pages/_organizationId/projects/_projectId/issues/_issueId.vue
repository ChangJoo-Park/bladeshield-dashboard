<template>
  <div>
    <h1>{{ issue }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { params: { organizationId, projectId, issueId } } = route
    const issue = await app.$axios.$get(`/api/issues/${issueId}`)

    return { issue }
  }
}
</script>

<style>

</style>
