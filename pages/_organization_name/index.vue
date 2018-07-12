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
          <v-btn color="blue darken-1" flat @click.native="dialog = false">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <project-item :item="{ name: 'Hello', description: 'world', slug: 'hello-world' }" />
  </v-layout>
</template>

<script>
import ProjectItem from '~/components/organization/ProjectItem.vue'
export default {
  components: {
    ProjectItem
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style>

</style>
