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
                    ></v-text-field>
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
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-card-actions>
                  <v-btn flat :to="{name: 'web.home'}" tabindex="4">go to home page</v-btn>
                  <v-spacer></v-spacer>
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
  import {authService} from '@/api/auth'
  export default {
    name: 'SignIn',
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        showPassword: false,
        hasErrors: false
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll()
          .then(() => {
            if (this.$validator.errors.items.length === 0) {
              authService.authenticateUser(this.user)
                .then(token => {
                  authService.saveToken(token)
                    .then(() => {
                      this.$router.push({name: 'admin.home'})
                    })
                })
                .catch(() => {
                  this.hasErrors = true
                })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    .login-error {
      margin-top: -63px;
    }

    .card {
      background-color: rgba(255, 255, 255, 0.7);

      form {
        width: 100%;
      }
    }
  }
</style>
