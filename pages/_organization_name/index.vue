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
                <v-text-field label="이름" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="설명" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false; infoDialog = true">저장</v-btn>
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
    <project-item :item="{ name: 'Vue', description: 'Vue로 만든 프로젝트', slug: 'project-name' }" />
  </v-layout>
</template>

<script>
import ProjectItem from '~/components/organization/ProjectItem.vue'
export default {
  auth: true,
  components: {
    ProjectItem
  },
  data () {
    return {
      dialog: false,
      infoDialog: false
    }
  }
}
</script>

<style>

</style>
