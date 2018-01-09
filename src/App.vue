<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang='stylus' scoped>
@import './common/stylus/mixin.styl'
#app
  position:absolute
  top:0
  left:0
  right:0
  bottom:0
  overflow:hidden
</style>
