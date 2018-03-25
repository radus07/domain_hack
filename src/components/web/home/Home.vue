<template>
  <v-container grid-list-xs>
    <app-error v-if="appError.error" :appError="appError"></app-error>
    <v-layout v-if="!appError.error">
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
        <domain-list v-if="text" :domains="domains"></domain-list>
        <div class="info-container pt-5" v-else="text">
          <h2>Welcome to Domain Hack</h2>
          <h3 class="pt-3">For generating domain names, you must to input something.</h3>
          <h3 class="pt-3">For example:
            <v-btn flat @click="getDomains('marcus')">marcus</v-btn>
            <v-btn flat @click="getDomains('arialius')">arialius</v-btn>
            <v-btn flat @click="getDomains('mucuses')">mucuses</v-btn>.
          </h3>
          <v-btn v-if="!user.auth" class="mt-5" style="width: 200px;" round :to="{name: 'web.sign_in'}">sign in</v-btn>
          <v-btn v-if="user.auth" class="mt-5" round :to="{name: 'admin.home'}">admin page</v-btn>
          <v-btn v-if="user.auth" class="mt-5" round @click="logout()">sign out</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {domainService} from '@/api/domains'
  import {authService} from '@/api/auth'
  import AppError from '@/components/common/AppError'
  import DomainList from './fragments/DomainList'

  export default {
    name: 'home',
    mounted () {
      this.checkServerConnection()
      this.setUserDetails()
    },
    data () {
      return {
        /**
         * Contains details about user
         */
        user: {},
        /**
         * Text model for getting the inserted text by the user
         */
        text: null,
        /**
         * The list of possible domain names
         */
        domains: [],
        /**
         * Details about the error when server not responds
         */
        appError: {
          error: false,
          type: 'ERR_CONNECTION_REFUSED',
          message: 'Cannot connect to the server. Please try again later. :('
        }
      }
    },
    methods: {
      /**
       * Check the server connection when the route contains error params
       */
      checkServerConnection () {
        if (this.$route.name === 'web.home' &&
          this.$route.query.error &&
          this.$route.query.error_type === 'ERR_CONNECTION_REFUSED') {
          authService.checkConnection()
            .then(() => {
              this.$router.replace({name: 'web.home'})
              this.appError.error = false
            })
            .catch(() => {
              this.appError.error = true
            })
        }
      },
      /**
       * Get users's details from db
       */
      setUserDetails () {
        authService.getUserDetails()
          .then(user => {
            this.user = user
          })
      },
      /**
       * Get all possible domain names depends on inserted text
       */
      getDomains (text) {
        if (text) {
          this.text = text.replace(/[^A-Z0-9-]+/ig, '')
          domainService.getDomains(text)
            .then(response => {
              this.domains = response
            })
        }
      },
      /**
       * Logout the logged user
       */
      logout () {
        authService.logoutUser(this.$router)
      }
    },
    watch: {
      /**
       * Watch when the route's params has changed, and check the server connection
       */
      '$route.query' () {
        this.checkServerConnection()
      }
    },
    components: {
      AppError,
      DomainList
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
