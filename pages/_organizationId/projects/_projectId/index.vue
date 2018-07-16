<template>
  <div>
    <h1>{{ project.name }}</h1>
    <small>{{ project.description }}</small>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-btn slot="activator" color="primary" dark>Integrate Slack</v-btn>
      <v-card>
        <v-card-title class="headline">Slack Integrate</v-card-title>
        <v-form>
          <v-text-field
            v-model="slack.url"
            :counter="10"
            label="WebHook URL"
            required
          ></v-text-field>
          <v-text-field
            v-model="slack.channel"
            :counter="10"
            label="Channel"
            required
          ></v-text-field>
          <v-text-field
            v-model="slack.username"
            label="Username"
            required
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Issues
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="project.issues"
        select-all
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td @click="onClickIssue(props.item)">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.source }}</td>
          <td class="text-xs-right">{{ props.item.assigned }}</td>
          <td class="text-xs-right">{{ props.item.events.length }}</td>
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
    return { project }
  },
  data () {
    return {
      slack: {
        url: '',
        username: '',
        channel: ''
      },
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
        { text: 'Users', value: 'users' }
      ]
    }
  },
  methods: {
    onClickIssue (item) {
      const { params: { organizationId, projectId }  } = this.$route
      this.$router.push({
        name: 'organizationId-projects-projectId-issues-issueId',
        params: {
          organizationId,
          projectId,
          issueId: item._id
        }
      })
    }
  }
}
</script>

<style>

</style>
