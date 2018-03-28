<template>
  <div class="tld-data-table">
    <v-text-field
      class="tld-search"
      v-model="search"
      label="Search"
      append-icon="search"
      :counter="150"
      maxlength="150"
    />
    <v-data-table
      :headers="headers"
      :items="tlds"
      :search="search"
      :pagination.sync="pagination"
      :rows-per-page-items="[10, 15]"
      v-model="selected"
      select-all
      item-key="tld"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected"/>
        </td>
        <td class="text-xs-left">{{props.item.tld}}</td>
        <td class="text-xs-left">{{props.item.country}}</td>
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
    name: 'tld-data-table',
    props: ['tlds'],
    data () {
      return {
        /**
         * Search model for filtering tlds
         */
        search: '',
        /**
         * Used to control pagination
         */
        pagination: {},
        /**
         * The list of selected tlds
         */
        selected: [],
        /**
         * The list of header columns
         */
        headers: [
          {
            text: 'TLD',
            align: 'left',
            value: 'tld',
            width: '32%'
          },
          {
            text: 'Country',
            align: 'left',
            value: 'country',
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
       * Watch when user select a tld and emit selected tlds to parent component
       * @param tlds - the list of selected tlds
       */
      selected (tlds) {
        this.$emit('selectedTlds', tlds)
      }
    },
    methods: {
      /**
       * Emit the tld which the user wants to edit to parent component
       * @param tld - the selected tld
       */
      edit (tld) {
        this.$emit('edit', tld)
      },
      /**
       * Emit the tld which the user wants to delete to parent component
       * @param tld - the selected tld
       */
      remove (tld) {
        this.$emit('remove', tld)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tld-data-table {
    .tld-search {
      position: absolute;
      width: 30%;
      margin-top: -74px;
      right: 8px;
    }

    .elevation-1 {
      /deep/ .table__overflow {
        table {
          thead {
            background-color: rgba(0,0,0,0.1);
          }
        }
      }
    }
  }
</style>
