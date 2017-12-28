<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <ul class='navbar border-1px'>
      <li class='item'><router-link :to='{name:"goods"}'>商品</router-link></li>
      <li class='item'><router-link :to='{name:"ratings"}'>评价</router-link></li>
      <li class='item'><router-link :to='{name:"seller"}'>商家</router-link></li>
    </ul>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
import header from 'components/header/header'
import axios from 'axios'

const ERR_OK = 0
export default {
  name: 'app',
  components: {
    'v-header': header
  },
  data () {
    return {
      seller: {}
    }
  },
  mounted () {
    this.$nextTick(function () {
      const url = '/api/seller'
      axios.get(url).then((res) => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data.data
        }
      })
    })
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './common/stylus/mixin.styl'
#app
  overflow:hidden
  .navbar
    display:flex
    width:100%
    height:40px
    line-height:40px
    text-align:center
    border-1px(rgba(7,17,27,0.1))
    .item
      flex:1
      &>a
        display: inline-block
        width:100%
        font-size:20px
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
