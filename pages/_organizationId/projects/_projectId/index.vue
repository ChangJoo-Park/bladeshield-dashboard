<template>
  <div>
    <h1>{{ project.name }}</h1>
    <small>{{ project.description }}</small>
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
          <td @click="onClickIssue(props.item)">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
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
      search: '',
      headers: [
        {
          text: 'Error Message',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Source', value: 'source' },
        { text: 'Message', value: 'message' },
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
