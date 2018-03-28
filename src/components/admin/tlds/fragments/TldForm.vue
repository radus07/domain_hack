<template>
  <v-card>
    <v-card-title primary-title style="background-color: #f5f5f5; color: rgba(0,0,0,.54)">
      <h3 class="headline mb-0">{{tldForm.title}}</h3>
    </v-card-title>
    <v-card-actions>
      <form @submit.prevent="save()">
        <v-container grid-list-xs>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                tabindex="1"
                label="Tld*"
                v-model="item.tld"
                :error-messages="errors.collect('Tld')"
                v-validate="'required|max:5'"
                data-vv-name="Tld"
                maxlength="5"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                tabindex="2"
                label="Country*"
                v-model="item.country"
                :error-messages="errors.collect('Country')"
                v-validate="'required|max:150'"
                data-vv-name="Country"
                maxlength="150"
              />
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer/>
            <v-btn tabindex="4" color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
            <v-btn tabindex="3" :type="'submit'" color="primary">Save</v-btn>
          </v-card-actions>
        </v-container>
      </form>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'tld-form',
    props: ['tldForm'],
    data () {
      return {
        /**
         * The tld's details which will bound into form
         */
        item: Object.assign({}, this.tldForm.item)
      }
    },
    methods: {
      /**
       * Emit the validated tld for saving to parent component
       */
      async save () {
        await this.$validator.validateAll()
        if (this.$validator.errors.items.length === 0) {
          this.$emit('save', this.item)
        }
      },
      /**
       * Emit the 'cancel' event to parent component
       */
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    width: 100%;
  }
</style>
