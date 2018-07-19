<template>
  <v-tab-item id="tab-details">
    <v-card>
      <pager
        @updated-index="onUpdateCurrentIndex"
        :total="events.length"
      />
      <h3>Event : {{ currentEvent._id }}</h3>
      <h4>{{ currentEvent.createdAt }}</h4>
      <!-- Message -->
      <v-card-text>{{ currentEvent.message }}</v-card-text>
      <!-- Source -->
      <v-card-text>
        {{ currentEvent.source }} [{{ currentEvent.lineno }} : {{ currentEvent.colno }}]
      </v-card-text>
      <!-- UserAgent -->
      <v-card-text v-if="currentEvent.useragent">
        <p><strong>Browser:</strong> {{ currentEvent.useragent.browser.name }} / {{ currentEvent.useragent.browser.version }}</p>
        <p><strong>Engine:</strong> {{ currentEvent.useragent.engine.name }} / {{ currentEvent.useragent.engine.version }}</p>
        <p><strong>OS:</strong> {{ currentEvent.useragent.os.name }} / {{ currentEvent.useragent.os.version }}</p>
        <p><strong>CPU:</strong> {{ currentEvent.useragent.cpu.architecture }}</p>
      </v-card-text>
      <!-- Stacktrace -->
      <!-- <v-card-text v-html="replaceLineFeedToBreak(currentEvent.stack)"></v-card-text> -->
      <v-card-text><pre>{{currentEvent.stack}}</pre></v-card-text>
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
    },
    replaceLineFeedToBreak (text) {
      return text
    }
  }
}
</script>

<style>

</style>
