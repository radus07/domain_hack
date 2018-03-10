<template>
  <v-card>
    <v-card-title primary-title style="background-color: #f5f5f5; color: rgba(0,0,0,.54)">
      <h3 class="headline mb-0">{{userForm.title}}</h3>
    </v-card-title>
    <v-card-actions>
      <form @submit.prevent="save()">
        <v-container grid-list-xs>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                tabindex="1"
                v-model="item.username"
                label="Username*"
                :error-messages="errors.collect('Username')"
                v-validate="'required|max:30'"
                data-vv-name="Username"
                maxlength="30"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                tabindex="2"
                v-model="item.password"
                label="Password*"
                :error-messages="errors.collect('Password')"
                v-validate="'required'"
                data-vv-name="Password"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :disabled="!!item._id"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
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
    name: 'user-form',
    props: ['userForm'],
    data () {
      return {
        /**
         * The user's details which will bound into form
         */
        item: Object.assign({}, this.userForm.item),
        /**
         * A flag which set the type of password field
         */
        showPassword: false
      }
    },
    methods: {
      /**
       * Emit the validated user for saving to parent component
       */
      save () {
        this.$validator.validateAll()
          .then(() => {
            if (this.$validator.errors.items.length === 0) {
              this.$emit('save', this.item)
            }
          })
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
