<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 sm6 md4 offset-sm3 offset-md4>
        <v-alert class="login-error" color="error" icon="error" value="true" v-if="hasErrors">
          Invalid username or password.
        </v-alert>
        <v-card>
          <v-card-title style="background-color: #f5f5f5; color: rgba(0,0,0,.54)" primary-title>
            <h3 class="headline mb-0">Sign in</h3>
          </v-card-title>
          <v-card-actions>
            <form @submit.prevent="submit()">
              <v-container grid-list-xs>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      tabindex="1"
                      v-model="user.username"
                      label="Username*"
                      :error-messages="errors.collect('Username')"
                      v-validate="'required|max:30'"
                      data-vv-name="Username"
                      maxlength="30"
                      prepend-icon="person"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      tabindex="2"
                      v-model="user.password"
                      label="Password*"
                      :error-messages="errors.collect('Password')"
                      v-validate="'required'"
                      data-vv-name="Password"
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => showPassword = !showPassword"
                      :type="showPassword ? 'text' : 'password'"
                      prepend-icon="lock"
                    />
                  </v-flex>
                </v-layout>
                <v-card-actions>
                  <v-btn flat :to="{name: 'web.home'}" tabindex="4">go to home page</v-btn>
                  <v-spacer/>
                  <v-btn :type="'submit'" color="primary" tabindex="3">sign in</v-btn>
                </v-card-actions>
              </v-container>
            </form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {UserService, AuthService} from '@/common/api.service'

  export default {
    name: 'sign-in',
    data () {
      return {
        /**
         * Contains details about the user
         * @property username - user's username
         * @property password - user's password
         */
        user: {
          username: '',
          password: ''
        },
        /**
         * A flag which set the type of password field
         */
        showPassword: false,
        /**
         * A flag which show or hide the error message
         */
        hasErrors: false
      }
    },
    methods: {
      /**
       * Login the user
       */
      async submit () {
        await this.$validator.validateAll()
        if (this.$validator.errors.items.length === 0) {
          try {
            const token = await UserService.authenticate(this.user)
            await AuthService.saveToken(token)
            this.$router.push({name: 'admin.home'})
          } catch (err) {
            this.hasErrors = true
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .layout
    .login-error
      margin-top: -63px

    .card
      background-color: rgba(255, 255, 255, 0.7)

      form
        width: 100%
</style>
