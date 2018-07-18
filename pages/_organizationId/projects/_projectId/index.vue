<template>
  <div>
    <h1>{{ project.name }}</h1>
    <small>{{ project.description }}</small>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-btn slot="activator" color="primary" dark>Integrate with Slack</v-btn>
      <v-card>
        <v-card-title class="headline">Integrate with Slack</v-card-title>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="project.slack.url" label="WebHook URL" required />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="project.slack.channel" label="Channel" required />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="project.slack.username" label="Username" required />
            </v-flex>
          </v-layout>
        </v-container>
        <v-form>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click.native="onClickSlackIntegrate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Issues
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="project.issues" select-all class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td @click="onClickIssue(props.item)">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.source }}</td>
          <td class="text-xs-right">{{ props.item.events }}</td>
          <td class="text-xs-right">{{ props.item.resolved }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { params: { organizationId, projectId } } = route
    const project = await app.$axios.$get(`/api/projects/${projectId}?organization=${organizationId}`)
    if (!project.slack) {
      project.slack = {
        url: '',
        channel: '',
        username: ''
      }
    }
    return { project }
  },
  data () {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Error Message',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Source', value: 'source' },
        { text: 'Events', value: 'events' },
        { text: 'Resolved', value: 'resolved' }
      ]
    }
  },
  methods: {
    onClickIssue (item) {
      const { params: { organizationId, projectId } } = this.$route
      this.$router.push({
        name: 'organizationId-projects-projectId-issues-issueId',
        params: {
          organizationId,
          projectId,
          issueId: item._id
        }
      })
    },
    async onClickSlackIntegrate () {
      await this.$axios.$patch(`/api/projects/${this.$route.params.projectId}`, {
        slack: this.project.slack
      })
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
