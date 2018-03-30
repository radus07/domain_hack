<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <notification-snackbar :snackbar="notificationSnackbar"/>
      <v-dialog v-model="userForm.show" persistent max-width="500px">
        <component :is="userForm.component" :user-form="userForm" @cancel="userForm.show = false" @save="saveUser"/>
      </v-dialog>
      <v-flex xs12 lg8>
        <v-card>
          <v-card-title class="pa-0">
            <v-btn icon flat :to="{name: 'admin.home'}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <span class="subheading">Users</span>
          </v-card-title>
          <v-divider/>
          <v-card-actions class="py-3">
            <v-btn color="primary" dark @click.stop="openUserForm(defUser)">new user</v-btn>
            <v-btn @click="fetchUsers()" v-if="!selectedUsers.length">
              <v-icon color="green">refresh</v-icon>
            </v-btn>
            <v-btn @click="deleteUsers(selectedUsers)" v-if="selectedUsers.length">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            <v-spacer/>
          </v-card-actions>
          <v-divider/>
          <user-data-table :users="users" @edit="openUserForm" @remove="deleteUsers" @selectedUsers="setSelectedUsers"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {userService} from '@/api/users'
  import NotificationSnackbar from '../common/NotificationSnackbar'
  import UserDataTable from './fragments/UserDataTable'

  export default {
    name: 'users',
    mounted () {
      this.fetchUsers()
    },
    data () {
      return {
        /**
         * Contains all details about the yserForm component
         * @property show - show/hide the form
         * @property title - the form's title
         * @property item - the user's details
         * @property component - loads the userForm component
         */
        userForm: {
          show: false,
          title: '',
          item: {username: '', password: ''},
          component: null
        },
        /**
         * Default user details passed to userForm component
         */
        defUser: {username: '', password: ''},
        /**
         * Contains details needed for the notificationSnackbar component
         * @property show - show/hide the snackbar
         * @property message - the snackbar's message
         */
        notificationSnackbar: {show: false, message: ''},
        /**
         * The list of users which is passed to the userDataTable component
         */
        users: [],
        /**
         * The list of selected users which may be deleted together
         */
        selectedUsers: []
      }
    },
    methods: {
      /**
       * Get available users from db
       */
      async fetchUsers () {
        this.users = await userService.getUsers()
      },
      /**
       * Open the userForm component and set all details
       * @param item - user details
       */
      openUserForm (item) {
        this.userForm = {
          show: true,
          title: (item.username) ? `Edit User: ${item.username}` : 'New User',
          item: Object.assign({}, item),
          component: () => import('./fragments/UserForm')
        }
      },
      /**
       * Set selected users from userDataTable component
       * @param users - the list of selected users
       */
      setSelectedUsers (users) {
        this.selectedUsers = users
      },
      /**
       * Save user
       * @param user - the user for saving
       */
      async saveUser (user) {
        this.userForm.show = false
        try {
          await userService.saveUser(user)
          await this.fetchUsers()
          this.notificationSnackbar = {
            show: true,
            message: `The user '${user.username}' has been saved!`
          }
        } catch (err) {
          this.notificationSnackbar = {
            show: true,
            message: `An error occurred. Please try again!`
          }
        }
      },
      /**
       * Delete the selected users
       * @param users - the list of selected users
       */
      async deleteUsers (users) {
        if (confirm('Are you sure?')) {
          await userService.deleteUsers((users.length) ? users : [users])
          await this.fetchUsers()
          this.notificationSnackbar = {
            show: true,
            message: (users.length) ? `${users.length} users have been removed!` : '1 user has been removed!'
          }
        }
      }
    },
    components: {
      NotificationSnackbar,
      UserDataTable
    }
  }
</script>

<style lang="sass" scoped>
  .flex
    margin: 0 auto
</style>
