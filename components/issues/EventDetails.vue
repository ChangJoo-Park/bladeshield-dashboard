<template>
  <v-tab-item id="tab-details">
    <v-layout align-space-between justify-start row fill-height>
      <v-flex md8>
        <v-card>
          <pager
            @updated-index="onUpdateCurrentIndex"
            :total="events.length"
          />
          <h3>Event : {{ currentEvent._id }}</h3>
          <h4>{{ currentEvent.createdAt }}</h4>
          <!-- URL -->
          <v-card-text>
            <h4>URL</h4><br>
            {{ currentEvent.url }}
          </v-card-text>

          <!-- Message -->
          <v-card-text>
            <h4>Error Message</h4><br>
            {{ currentEvent.message }}
          </v-card-text>
          <!-- Source -->
          <v-card-text>
            <h4>Event Source [Line Number / Column Number]</h4><br>
            {{ currentEvent.source }} [{{ currentEvent.lineno }} : {{ currentEvent.colno }}]
          </v-card-text>
          <!-- UserAgent -->
          <v-card-text v-if="currentEvent.useragent">
            <h4>User Agent</h4><br>
            <p>{{ currentEvent.useragent.ua }}</p>
            <h4>System Details</h4><br>
            <span class="icon">
              <img src="https://icongr.am/devicon/chrome-original.svg?size=64" alt="Chrome" width="64px" height="64px">
              <span v-if="currentEvent.useragent.browser">
                <strong>Browser:</strong>
                {{ currentEvent.useragent.browser.name }} / {{ currentEvent.useragent.browser.version }}
              </span>
            </span>
            <span class="icon">
              <img src="https://icongr.am/devicon/windows8-original.svg?size=64" alt="Chrome" width="64px" height="64px">
              <strong>OS:</strong> {{ currentEvent.useragent.os.name }} / {{ currentEvent.useragent.os.version }}
            </span>
            <span class="icon" v-if="currentEvent.useragent.engine">
              <strong>Engine:</strong> {{ currentEvent.useragent.engine.name }} / {{ currentEvent.useragent.engine.version }}
            </span>
            <span class="icon" v-if="currentEvent.useragent.cpu">
              <strong>CPU:</strong> {{ currentEvent.useragent.cpu.architecture }}
            </span>
          </v-card-text>
          <!-- Stacktrace -->
          <!-- <v-card-text v-html="replaceLineFeedToBreak(currentEvent.stack)"></v-card-text> -->
          <v-card-text>
            <h4>Stacktrace</h4>
            <pre>{{currentEvent.stack}}</pre>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card>

        </v-card>
      </v-flex>
    </v-layout>


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
.icon {
  display: inline-block;
  margin-right: 30px;
  vertical-align: center;
}
.icon img {
  margin-right: 1rem;
}
</style>
