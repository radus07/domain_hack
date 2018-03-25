<template>
  <v-dialog v-model="appError.error" persistent max-width="500px">
    <v-alert type="error" :value="appError.error">
      <p>{{appError.message}}</p>
      <p v-if="appError.type === 'PAGE_NOT_FOUND'">Please try again or go to <router-link :to="{name: 'web.home'}"><span> Home page</span></router-link></p>
    </v-alert>
  </v-dialog>
</template>

<script>
  export default {
    name: 'app-error',
    props: ['appError']
  }
</script>

<style scoped>

</style>
