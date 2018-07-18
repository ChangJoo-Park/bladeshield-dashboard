<template>
  <div>
    <h1>{{ issue.title }}</h1>
    <h3>{{ issue.source }}</h3>
    <div></div>
    <div>
      <v-tabs v-model="active">
        <v-tab
          v-for="tab in tabs"
          :key="tab"
          :href="makeHrefByTab(tab)"
          ripple
        >
          {{ tab }}
        </v-tab>
        <v-tabs-items v-model="active">
          <!-- Tab Content - Details -->
          <event-details :events="issue.events"/>
          <!-- Tab Content - Comments -->
          <comments :comments="issue.comments" />
          <!-- Tab Content - Tags -->
        </v-tabs-items>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import EventDetails from '~/components/issues/EventDetails.vue'
import Comments from '~/components/issues/Comments.vue'
import Tags from '~/components/issues/Tags.vue'

export default {
  components: {
    EventDetails,
    Comments,
    Tags
  },
  async asyncData ({ app, route }) {
    const { params: { organizationId, projectId, issueId } } = route
    const issue = await app.$axios.$get(`/api/issues/${issueId}`)

    return { issue }
  },
  data () {
    return {
      active: null,
      tabs: ['Details', 'Comments', 'Tags']
    }
  },
  methods: {
    makeHrefByTab (activeTab = '') {
      return `#tab-${activeTab.toLowerCase()}`
    }
  }
}
</script>

<style>
</style>
