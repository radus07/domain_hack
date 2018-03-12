<template>
  <v-dialog v-model="error" persistent max-width="500px">
    <v-alert type="error" :value="error">
      Cannot connect to the server. Please try again later. :(
    </v-alert>
  </v-dialog>
</template>

<script>
  export default {
    name: 'app-error',
    props: ['error']
  }
</script>

<style scoped>

</style>
