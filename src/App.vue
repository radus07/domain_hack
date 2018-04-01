<template>
  <v-app id="app">
    <v-content>
      <router-view/>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
  import AppFooter from './components/common/AppFooter'
  export default {
    name: 'app',
    components: {
      AppFooter
    }
  }
</script>

<style lang="sass">
  @import '../node_modules/vuetify/dist/vuetify.min.css'
  *
    margin: 0
    padding: 0
  html, body
    width: 100%
    height: 100%
    overflow-y: hidden
    #app
      height: 100%
      overflow-y: hidden
      .content
        height: calc(100% - 36px)
        .content--wrap
          overflow-y: auto
</style>
