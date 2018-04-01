<template>
  <section class="web-section">
    <div>
      <router-view/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'web'
}
</script>

<style lang="sass" scoped>
  .web-section
    width: 100%
    height: 100%
    min-height: 500px
    background: url("../../static/img/backgroud.jpg") center
    background-size: cover
    > div
      height: 100%
      background-color: rgba(0, 0, 0, 0.56)
      display: flex
</style>
