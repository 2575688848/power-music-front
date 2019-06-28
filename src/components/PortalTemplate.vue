<template>
  <div id="portal-template">
    <img class="portal-logo" src="../assets/images/music.ico" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'portal-template',
  data () {
    return {
    }
  }
}
</script>

<style>
@import '../assets/css/portal-template.css'
</style>
