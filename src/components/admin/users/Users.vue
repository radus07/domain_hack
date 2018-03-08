<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 lg8>
        <v-card>
          <v-card-title>
            <v-btn icon flat :to="{name: 'admin.home'}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <h3 class="headline mb-0">Users</h3>
            <v-spacer></v-spacer>
            <v-snackbar
              :timeout="6000"
              :top="true"
              v-model="showSnackbar"
            >
              {{snackbarInfo}}
              <v-btn flat color="pink" @click.native="showSnackbar = false">Close</v-btn>
            </v-snackbar>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn fab outline small slot="activator" @click="newUser = {}">
                <v-icon>add</v-icon>
              </v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">User Details</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="newUser.username"
                          label="Username*"
                          maxlength="30"
                          prepend-icon="person"
                          v-validate="'required|max:30'"
                          data-vv-name="Username"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="newUser.password"
                          label="Password*"
                          name="password"
                          v-validate="'required'"
                          data-vv-name="Password"
                          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                          :append-icon-cb="() => showPassword = !showPassword"
                          :type="showPassword ? 'text' : 'password'"
                          prepend-icon="lock"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="saveUser(newUser)">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-tooltip top>
              <v-btn @click="fetchUsers()" fab outline color="green" small icon slot="activator">
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Get</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn @click="deleteUsers(selected)" :disabled="!selected.length" small outline fab color="red" icon slot="activator">
                <v-icon>close</v-icon>
              </v-btn>
              <span>Remove</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="users"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            v-model="selected"
            select-all
            item-key="username"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox
                  primary
                  hide-details
                  v-model="props.selected"
                ></v-checkbox>
              </td>
              <td>
                <v-tooltip top>
                  <v-edit-dialog
                    @open="editUser =  Object.assign({}, props.item)"
                    @save="updateUser(editUser)"
                    large
                    slot="activator"
                  >
                    <div>{{ props.item.username }}</div>
                    <div slot="input" class="mt-3 title">Edit username: {{props.item.username}}</div>
                    <v-text-field
                      slot="input"
                      label="Edit"
                      v-model="editUser.username"
                      single-line
                      :counter="30"
                      maxlength="30"
                      autofocus
                    ></v-text-field>
                  </v-edit-dialog>
                  <span>Edit</span>
                </v-tooltip>
              </td>
              <td>{{props.item.password}}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {userService} from '@/api/users'
  export default {
    name: 'users',
    mounted () {
      this.fetchUsers()
    },
    data () {
      return {
        dialog: false,
        showPassword: false,
        showSnackbar: false,
        snackbarInfo: '',
        newUser: {},
        editUser: {},
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Username',
            align: 'left',
            value: 'username'
          },
          {
            text: 'Password',
            align: 'left',
            sortable: false,
            value: 'password'
          }
        ],
        users: []
      }
    },
    methods: {
      updateUser (user) {
        userService.updateUser(user)
          .then(() => {
            this.snackbarInfo = 'User was updated!'
            this.showSnackbar = true
            this.fetchUsers()
          })
          .catch(() => {
            this.snackbarInfo = 'User was not updated!'
            this.showSnackbar = true
          })
      },
      fetchUsers () {
        userService.getUsers()
          .then(res => {
            this.users = res
          })
      },
      deleteUsers (users) {
        userService.deleteUsers(users)
          .then(() => {
            const message = (this.selected.length > 1) ? 'Users were' : 'User was'
            this.selected = []
            this.snackbarInfo = `${message} deleted!`
            this.showSnackbar = true
            this.fetchUsers()
          })
      },
      saveUser (user) {
        this.$validator.validateAll()
          .then(() => {
            if (this.$validator.errors.items.length === 0) {
              userService.saveUser(user)
                .then(() => {
                  this.snackbarInfo = 'User was created!'
                  this.showSnackbar = true
                  this.dialog = false
                  this.fetchUsers()
                })
                .catch(() => {
                  this.snackbarInfo = 'User was not created!'
                  this.showSnackbar = true
                  this.dialog = false
                })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex {
    margin: 0 auto;
  }
</style>
