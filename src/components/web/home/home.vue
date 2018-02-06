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
              v-on:input="getDomains (text)"
              clearable
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div v-if="text" class="domain-list">
          <v-layout class="text-xs-left pb-2 pl-2 headline">
            <v-flex xs8>
              Domain
            </v-flex>
            <v-flex xs4 class="pl-3">
              Country
            </v-flex>
          </v-layout>
          <div class="domain-items">
            <v-layout v-for="domain in domains" v-bind:key="domain._id" class="text-xs-left pl-2">
              <v-flex xs8>
                <div class="domain-item">
                  <span class="domain-name">{{(domain.name) ? domain.name : 'xxx'}}</span>.
                  <span class="domain-tld">{{domain.tld}}</span>/
                  <span class="domain-path">{{domain.path}}</span>
                </div>
              </v-flex>
              <v-flex xs4 class="pl-3">
                <div><span>{{domain.country}}</span></div>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="info-container pt-5" v-else="text">
          <h2>Welcome to the Domain Hack</h2>
          <h3 class="pt-3">For generating the domain names, you must input something.</h3>
          <h3 class="pt-3">For example:
            <v-btn flat @click="text='marcus'; getDomains()">marcus</v-btn>
            <v-btn flat @click="text='arialius'; getDomains()">arialius</v-btn>
            <v-btn flat @click="text='mucuses'; getDomains()">mucuses</v-btn>.
          </h3>
          <v-btn v-if="!user.auth" class="mt-5" style="width: 200px;" round :to="{name: 'web.sign_in'}">sign in</v-btn>
          <v-btn v-if="user.auth" class="mt-5" style="width: 200px;" round :to="{name: 'admin.home'}">go to the admin page</v-btn>
          <v-btn v-if="user.auth" class="mt-5" round @click="logout()">sign out</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {domainService} from '@/api/domains'
  import {authService} from '@/api/auth'
  export default {
    name: 'Home',
    mounted () {
      this.setUserDetails()
    },
    data () {
      return {
        user: {},
        text: null,
        domains: []
      }
    },
    methods: {
      setUserDetails () {
        authService.getUserDetails()
          .then(user => {
            this.user = user
          })
      },
      getDomains () {
        if (this.text) {
          this.text = this.text.replace(/[^A-Z0-9-]+/ig, '')
          domainService.getDomains(this.text)
            .then(response => {
              this.domains = response
            })
        }
      },
      logout () {
        authService.logoutUser(this.$router)
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

      .domain-list {
        height: calc(100% - 76px);
        position: relative;
        float: left;
        width: 100%;

        .domain-items {
          position: absolute;
          overflow: hidden;
          height: calc(100% - 40px);
          width: 100%;
          overflow-y: auto;

          .layout {
            border-bottom: 1px solid rgba(0,0,0,.12);

            .domain-item {
              word-wrap: break-word;

              .domain-tld {
                color: rgb(0, 10, 163);
              }

              .domain-path {
                font-style: italic;
              }
            }
          }
        }
      }

      .info-container {
        h3 {
          button {
            text-transform: lowercase;
          }
        }
      }
    }
  }
</style>
