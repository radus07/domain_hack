<template>
  <div class="domain-list">
    <v-layout class="text-xs-left pb-2 pl-2 headline">
      <v-flex xs8>Domain name</v-flex>
      <v-flex xs4 class="pl-3">Country of origin</v-flex>
    </v-layout>
    <div class="domain-items">
      <v-layout v-for="domain in domains" :key="domain._id" class="text-xs-left pl-2">
        <v-flex xs8>
          <span>{{(domain.name) ? domain.name : 'xxx'}}.</span>
          <span>{{domain.tld}}/</span>
          <span>{{domain.path}}</span>
        </v-flex>
        <v-flex xs4 class="pl-3">
          <span>{{domain.country}}</span>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'domain-list',
    props: ['domains']
  }
</script>

<style lang="sass" scoped>
  .domain-list
    height: calc(100% - 76px)
    position: relative
    float: left
    width: 100%

    .domain-items
      position: absolute
      overflow: hidden
      height: calc(100% - 40px)
      width: 100%
      overflow-y: auto

      .layout
        border-bottom: 1px solid rgba(0, 0, 0, .12)

        > div
          word-wrap: break-word

          span:nth-child(2)
            color: rgb(0, 10, 163)

          span:nth-child(3)
            font-style: italic
</style>
