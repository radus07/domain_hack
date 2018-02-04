<template>
  <v-app id="app">
    <v-content>
      <router-view/>
    </v-content>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
  import PageFooter from './components/fragments/footer'
  export default {
    name: 'App',
    components: {
      PageFooter
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/vuetify/dist/vuetify.min.css';

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-y: hidden;

    #app {
      height: 100%;
      overflow-y: hidden;

      .content--wrap {
        height: calc(100% - 36px);

        .content {
          overflow-y: auto;
        }
      }
    }
  }

</style>
