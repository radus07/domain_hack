<template>
  <div class="user-data-table">
    <v-text-field
      class="user-search"
      v-model="search"
      label="Search"
      append-icon="search"
      :counter="30"
      maxlength="30"
    />
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :pagination.sync="pagination"
      :rows-per-page-items="[10, 15]"
      v-model="selected"
      select-all
      item-key="username"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected"/>
        </td>
        <td class="text-xs-left">{{props.item.username}}</td>
        <td class="text-xs-left">{{props.item.password}}</td>
        <td class="layout">
          <v-btn icon class="mx-0" @click="edit(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="remove(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'user-data-table',
    props: ['users'],
    data () {
      return {
        /**
         * Search model for filtering users
         */
        search: '',
        /**
         * Used to control pagination
         */
        pagination: {},
        /**
         * The list of selected users
         */
        selected: [],
        /**
         * The list of header columns
         */
        headers: [
          {
            text: 'Username',
            align: 'left',
            value: 'username',
            width: '32%'
          },
          {
            text: 'Password',
            align: 'left',
            value: 'password',
            sortable: false,
            width: '50%'
          },
          {
            text: 'Actions',
            align: 'center',
            value: 'name',
            sortable: false,
            width: '10%'
          }
        ]
      }
    },
    watch: {
      /**
       * Watch when user select an item and emit selected item to parent component
       * @param users - the list of selected users
       */
      selected (users) {
        this.$emit('selectedUsers', users)
      }
    },
    methods: {
      /**
       * Emit the user item which the user wants to edit to parent component
       * @param user - the selected user
       */
      edit (user) {
        this.$emit('edit', user)
      },
      /**
       * Emit the user item which the user wants to delete to parent component
       * @param user - the selected user
       */
      remove (user) {
        this.$emit('remove', user)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .user-data-table
    .user-search
      position: absolute
      width: 30%
      margin-top: -74px
      right: 8px
    .elevation-1
      /deep/ .table__overflow
        table
          thead
            background-color: rgba(0, 0, 0, 0.1)
</style>
