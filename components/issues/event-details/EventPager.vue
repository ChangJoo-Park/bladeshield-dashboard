<template>
  <div>
    <v-btn
      small
      ripple
      @click="updateIndex(0)"
      :disabled="isFirstEvent"
    >
      &lt;|
    </v-btn>
    <v-btn
      small
      ripple
      @click="updateIndex(--current)"
      :disabled="!isRemainOlder"
    >
      Newer
    </v-btn>
    <v-btn
      small
      ripple
      @click="updateIndex(++current)"
      :disabled="!isRemainNewer"
    >
      Older
    </v-btn>
    <v-btn
      small
      ripple
      :disabled="isLastEvent"
      @click="updateIndex(total - 1)"
    >
      |&gt;
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [String, Number],
      required: true,
      default () { return 0 }
    }
  },
  data () {
    return {
      current: 0
    }
  },
  computed: {
    isFirstEvent () {
      return this.current === 0
    },
    isLastEvent () {
      return this.current === this.total - 1
    },
    isRemainOlder () {
      return !this.isFirstEvent
    },
    isRemainNewer () {
      return !this.isLastEvent && this.total - this.current > 0
    }
  },
  methods: {
    updateIndex(index) {
      if (index < 0) {
        this.current = 0
      } else if (index >= this.total) {
        this.current = this.total - 1
      } else {
        this.current = index
      }
      this.$emit('updated-index', index)
    }
  }
}
</script>

<style>

</style>
