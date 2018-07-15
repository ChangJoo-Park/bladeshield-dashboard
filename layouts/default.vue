<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      const { params } = this.$route
      return {
        fixed: true,
        clipped: false,
        drawer: true,
        items: [
          {
            icon: 'apps',
            title: '프로젝트',
            to: { name: 'organizationId', params: { organizationId: params.organizationId } }
          },
          {
            icon: 'show_chart',
            title: '통계',
            to: { name: 'organizationId-stats', params: { organizationId: params.organizationId } }
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'BladeShield'
      }
    }
  }
</script>
