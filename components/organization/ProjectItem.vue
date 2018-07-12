<template>
  <v-flex xs12>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">{{ item.name }}&nbsp;</div>
        <div>{{ item.description }}</div>
      </v-card-title>
      <v-card-actions>
        <v-btn
          flat
          :to="{
            name: 'organization_name-project_name',
            params: {
              organization_name: 'hello-world',
              project_name: 'project-name'
            }
          }">
          열기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
