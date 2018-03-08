<template>
  <section class="admin-section">
    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style lang="scss" scoped>
  .admin-section {
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
</style>
