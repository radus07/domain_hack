<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 xl8>
        <v-layout>
          <v-flex xs8>
            <v-text-field
              label="Input text here..."
              :counter="100"
              maxLength="100"
              v-model="text"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div v-if="text">
          <v-layout>
            <v-flex xs6>
              <b>Domain</b>
            </v-flex>
            <v-flex xs6>
              <b>Country</b>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              xxx.xxx.xx/
            </v-flex>
            <v-flex xs6>
              Name
            </v-flex>
          </v-layout>
        </div>
        <div v-else="text">
          For generating domain names, type text in the input field
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        text: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 90%;

    > .layout {
      height: 100%;
      margin: 0 auto;
      text-align: center;
    }

    .flex {
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.7);

      .layout {

        * {
          background: transparent;
        }
      }
    }
  }
</style>
