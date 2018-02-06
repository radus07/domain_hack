<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 lg8>
        <v-card>
          <v-card-title>
            <v-btn icon flat :to="{name: 'admin.home'}">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <h3 class="headline mb-0">TLDS</h3>
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
              <v-btn fab outline small slot="activator" @click="newTld = {}">
                <v-icon>add</v-icon>
              </v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">TLD Details</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="newTld.tld"
                          label="TLD*"
                          maxlength="10"
                          v-validate="'required|max:10'"
                          data-vv-name="TLD"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="newTld.country"
                          label="Country*"
                          v-validate="'required'"
                          data-vv-name="Country"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="saveTld(newTld)">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-tooltip top>
              <v-btn @click="fetchTlds()" fab outline color="green" small icon slot="activator">
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Get</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn @click="deleteTlds(selected)" :disabled="!selected.length" small outline fab color="red" icon slot="activator">
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
            v-bind:items="tlds"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            v-model="selected"
            select-all
            item-key="tld"
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
                    @open="editTld =  Object.assign({}, props.item)"
                    @save="updateTld(editTld)"
                    large
                    slot="activator"
                  >
                    <div>{{ props.item.tld }}</div>
                    <div slot="input" class="mt-3 title">Edit tld: {{props.item.tld}}</div>
                    <v-text-field
                      slot="input"
                      label="Edit"
                      v-model="editTld.tld"
                      single-line
                      :counter="5"
                      maxlength="5"
                      autofocus
                    ></v-text-field>
                  </v-edit-dialog>
                  <span>Edit</span>
                </v-tooltip>
              </td>
              <td>
                <v-tooltip top>
                  <v-edit-dialog
                    @open="editTld =  Object.assign({}, props.item)"
                    @save="updateTld(editTld)"
                    large
                    slot="activator"
                  >
                    <div>{{ props.item.country }}</div>
                    <div slot="input" class="mt-3 title">Edit country: {{props.item.country}}</div>
                    <v-text-field
                      slot="input"
                      label="Edit"
                      v-model="editTld.country"
                      single-line
                      :counter="150"
                      maxlength="150"
                      autofocus
                    ></v-text-field>
                  </v-edit-dialog>
                  <span>Edit</span>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {tldService} from '@/api/tlds'
  export default {
    name: 'Tlds',
    mounted () {
      this.fetchTlds()
    },
    data () {
      return {
        dialog: false,
        showSnackbar: false,
        snackbarInfo: '',
        newTld: {},
        editTld: {},
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'TLD',
            align: 'left',
            value: 'tld'
          },
          {
            text: 'Country',
            align: 'left',
            value: 'country'
          }
        ],
        tlds: []
      }
    },
    methods: {
      updateTld (tld) {
        tldService.updateTld(tld)
          .then(() => {
            this.snackbarInfo = 'Item was updated!'
            this.showSnackbar = true
            this.fetchTlds()
          })
          .catch(() => {
            this.snackbarInfo = 'Item was not updated!'
            this.showSnackbar = true
          })
      },
      fetchTlds () {
        tldService.getTlds()
          .then(res => {
            this.tlds = res
          })
      },
      deleteTlds (tlds) {
        tldService.deleteTlds(tlds)
          .then(() => {
            const message = (this.selected.length > 1) ? 'Items were' : 'Item was'
            this.selected = []
            this.snackbarInfo = `${message} deleted!`
            this.showSnackbar = true
            this.fetchTlds()
          })
      },
      saveTld (tld) {
        this.$validator.validateAll()
          .then(() => {
            if (this.$validator.errors.items.length === 0) {
              tldService.saveTld(tld)
                .then(() => {
                  this.snackbarInfo = 'Item was created!'
                  this.showSnackbar = true
                  this.dialog = false
                  this.fetchTlds()
                })
                .catch(() => {
                  this.snackbarInfo = 'Item was not created!'
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
