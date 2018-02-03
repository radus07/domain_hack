<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 xl8>
        <v-layout>
          <v-flex xs8>
            <v-text-field
              label="Input text here..."
              :counter="75"
              maxLength="75"
              v-model="text"
              v-on:input="getDomains ()"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div v-if="text">
          <v-layout>
            <v-flex xs6>
              <b>Domain</b>
            </v-flex>
            <v-flex xs6>
              <b>Country</b>
            </v-flex>
          </v-layout>
          <v-layout v-for="domain in domains" v-bind:key="domain._id">
            <v-flex xs6>
              {{(domain.name) ? domain.name : 'xxx'}}.<b>{{domain.tld}}</b>/<i>{{domain.path}}</i>
            </v-flex>
            <v-flex xs6>
              {{domain.country}}
            </v-flex>
          </v-layout>
        </div>
        <div v-else="text">
          For generating domain names, type text in the input field
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {tldsService} from '@/api/tlds'
  export default {
    name: 'Home',
    data () {
      return {
        text: null,
        domains: []
      }
    },
    methods: {
      getDomains () {
        this.text = this.text.replace(/[^A-Z0-9-]+/ig, '')
        tldsService.getDomains(this.text)
          .then(response => {
            this.domains = response
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 90%;

    > .layout {
      height: 100%;
      margin: 0 auto;
      text-align: center;
    }

    .flex {
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.7);

      .layout {

        * {
          background: transparent;
        }
      }
    }
  }
</style>
