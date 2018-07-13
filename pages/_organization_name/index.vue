<template>
  <v-layout column>
    <!-- New Org Dialog-->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>새 프로젝트 만들기</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">새 프로젝트</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="이름" required v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="설명" required v-model="description"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" flat @click.native="onSaveProject">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Info -->
    <v-dialog v-model="infoDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">프로젝트가 만들어졌습니다.</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <h1>가이드</h1>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="infoDialog = false">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <project-item
      v-for="(item, index) in organization.projects"
      :key="index"
      :item="item"
    />
  </v-layout>
</template>

<script>
import ProjectItem from '~/components/organization/ProjectItem.vue'
export default {
  auth: true,
  components: {
    ProjectItem
  },
  async asyncData ({ app, store, route }) {
    const organization = await app.$axios.$get(`/api/organizations/${route.params['organization_name']}`)
    return {
      organization
    }
  },
  data () {
    return {
      name: '',
      description: '',
      dialog: false,
      infoDialog: false
    }
  },
  methods: {
    async onSaveProject () {
      this.dialog = false
      const project = await this.$axios.$post('/api/projects', {
        organizationId: this.organization._id,
        name: this.name,
        description: this.description
      })
      this.organization.projects.push(project)
      this.infoDialog = true
    }
  }
}
</script>

<style>

</style>
