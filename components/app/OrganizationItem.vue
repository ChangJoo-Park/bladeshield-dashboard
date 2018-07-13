<template>
  <v-flex xs12>
    <v-card color="blue-grey" class="white--text">
      <v-card-title primary-title>
        <div class="headline">{{ item.name }}&nbsp;</div>
        <div>{{ item.description }}</div>
      </v-card-title>
      <v-card-actions>
        <v-btn
          flat
          dark
          :to="{ name: 'organization_name', params: { organization_name: item._id } }">
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
