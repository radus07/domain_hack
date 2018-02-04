<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12>
        <v-btn class="mt-5" style="width: 300px;" round :to="{name: 'web.home'}">go to the domain names generator</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-list-tile avatar :to="{name: 'admin.users'}">
          <v-list-tile-avatar>
            <v-icon>people</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
      <v-flex xs12 sm6>
        <v-list-tile avatar :to="{name: 'admin.tlds'}">
          <v-list-tile-avatar>
            <v-icon>language</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Tlds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    computed: {}
  }
</script>

<style lang="scss" scoped>
  .layout {
    .flex {
      text-align: center;
      li {
        width: 150px;
        margin: 0 auto;
        list-style: none;
      }
    }
  }
</style>
