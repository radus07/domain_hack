<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <notification-snackbar :snackbar="notificationSnackbar"></notification-snackbar>
      <v-dialog v-model="tldForm.show" persistent max-width="500px">
        <component :is="tldForm.component" :tld-form="tldForm" @cancel="tldForm.show = false" @save="saveTld"></component>
      </v-dialog>
      <v-flex xs12 lg8>
        <v-card>
          <v-card-title class="pa-0">
            <v-btn icon flat :to="{name: 'admin.home'}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <span class="subheading">TLDS</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions class="py-3">
            <v-btn color="primary" dark @click.stop="openTldForm(defTld)">new tld</v-btn>
            <v-btn @click="fetchTlds()" v-if="!selectedTlds.length">
              <v-icon color="green">refresh</v-icon>
            </v-btn>
            <v-btn @click="deleteTlds(selectedTlds)" v-if="selectedTlds.length">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-divider></v-divider>
          <tld-data-table :tlds="tlds" @edit="openTldForm" @remove="deleteTlds" @selectedTlds="setSelectedTlds"></tld-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {tldService} from '@/api/tlds'
  import NotificationSnackbar from '../common/NotificationSnackbar'
  import TldDataTable from './fragments/TldDataTable'

  export default {
    name: 'tlds',
    mounted () {
      this.fetchTlds()
    },
    data () {
      return {
        /**
         * Contains all details about the tldForm component
         * @property show - show/hide the form
         * @property title - the form's title
         * @property item - the tld's details
         * @property component - loads the tldForm component
         */
        tldForm: {
          show: false,
          title: '',
          item: {tld: '', country: ''},
          component: null
        },
        /**
         * Default tld details passed to tldForm component
         */
        defTld: {tld: '', country: ''},
        /**
         * Contains details needed for the notificationSnackbar component
         * @property show - show/hide the snackbar
         * @property message - the snackbar's message
         */
        notificationSnackbar: {show: false, message: ''},
        /**
         * The list of tlds which is passed to the tldDataTable component
         */
        tlds: [],
        /**
         * The list of selected tlds which may be deleted together
         */
        selectedTlds: []
      }
    },
    methods: {
      /**
       * Get available tlds from db
       */
      async fetchTlds () {
        this.tlds = await tldService.getTlds()
      },
      /**
       * Open the tldForm component and set all details
       * @param item - tld details
       */
      openTldForm (item) {
        this.tldForm = {
          show: true,
          title: (item.tld) ? `Edit Tld: ${item.tld}` : 'New Tld',
          item: Object.assign({}, item),
          component: () => import('./fragments/TldForm')
        }
      },
      /**
       * Set selected tlds from tldDataTable component
       * @param tlds - the list of selected tlds
       */
      setSelectedTlds (tlds) {
        this.selectedTlds = tlds
      },
      /**
       * Save tld
       * @param tld - the tld for saving
       */
      async saveTld (tld) {
        this.tldForm.show = false
        try {
          await tldService.saveTld(tld)
          await this.fetchTlds()
          this.notificationSnackbar = {
            show: true,
            message: `The tld '${tld.tld}' has been saved!`
          }
        } catch (err) {
          this.notificationSnackbar = {
            show: true,
            message: `An error occurred. Please try again!`
          }
        }
      },
      /**
       * Delete the selected tlds
       * @param tlds - the list of selected tlds
       */
      async deleteTlds (tlds) {
        if (confirm('Are you sure?')) {
          await tldService.deleteTlds((tlds.length) ? tlds : [tlds])
          await this.fetchTlds()
          this.notificationSnackbar = {
            show: true,
            message: (tlds.length) ? `${tlds.length} tlds have been removed!` : '1 tld has been removed!'
          }
        }
      }
    },
    components: {
      NotificationSnackbar,
      TldDataTable
    }
  }
</script>

<style lang="scss" scoped>
  .flex {
    margin: 0 auto;
  }
</style>
