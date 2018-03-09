<template>
  <v-snackbar
    :timeout="6000"
    :top="true"
    v-model="snackbar.show"
  >
    {{snackbar.message}}
    <v-btn flat color="green" @click.native="snackbar.show = false">OK</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'notification-snackbar',
    props: ['snackbar']
  }
</script>
