<template>
  <v-tab-item id="tab-details">
    <v-card>
      <pager
        @updated-index="onUpdateCurrentIndex"
        :total="events.length"
      />
      <h3>Event : {{ currentEvent._id }}</h3>
      <h4>{{ currentEvent.createdAt }}</h4>
      <v-card-text>{{ currentEvent }}</v-card-text>
    </v-card>
  </v-tab-item>
</template>

<script>
import Pager from '~/components/issues/event-details/EventPager.vue'
export default {
  components: {
    Pager
  },
  props: {
    events: {
      types: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      currentEvent: null
    }
  },
  created () {
    this.currentEvent = this.events[0]
  },
  methods: {
    onUpdateCurrentIndex (index) {
      this.currentEvent = this.events[index]
    }
  }
}
</script>

<style>

</style>
