<template>
  <div>
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
// 测试环境
// const ERR_OK = 0
const ERR_OK = 'OK'
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
     // const url = '/data/data.php' 本地调试
     const url = 'http://101.200.48.175/data.php'
      axios.get(url).then((res) => {
        // 测试环境
        // if (res.data.errno === ERR_OK) {
        //   this.seller = res.data.data
        // }
        if (res.statusText === ERR_OK) {
          this.seller = res.data
        }
      })
    })
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixin'
.navbar
  display:flex
  width:100%
  height:3.5rem
  line-height:3.5rem
  text-align:center
  border-1px(rgba(7,17,27,0.1))
  .item
    flex:1
    &>a
      display: inline-block
      width:100%
      font-size:1.6rem
      color:rgb(77,85,93)
      &.active
        color:rgb(240,20,20)
</style>
