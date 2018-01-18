<template>
<div>
  <div class='detail-food' v-show='food.name'>
    <div class='fooddetail'>
      <div class='img'>
        <img :src='food.thumb' width='100%' height='275' />
        <collect :food='food' @setItem='setItem'></collect>
      </div>
      <div class='wrap detail'>
        <div class='left'>
          <h2 class='title'>{{food.name}}</h2>
          <div class='extra'>
            <span>月售 {{food.discount}} 份</span>
            <span>好评率 {{food.rating}}%</span>
          </div>
          <div class='price'>
            <span class='nowPrice'>￥{{food.final_price/100}}</span>
            <span class='oldPrice' v-show='food.price'>￥{{food.price/100}}</span>
          </div>
        </div>
        <div class='right'>
          <addbtn :food='food' @addbtn='addGood'></addbtn>  
        </div>
      </div>
    </div>
    <div class='wrap board'>
      <h2 class='title'>商品介绍</h2>
      <p class='info' v-if='food.info'>{{food.info}}</p>
      <p class='info' v-else>暂无相关介绍</p>
    </div>
    <div class='wrap comment'>
      <h2 class='titles'>商品评价</h2>
      <div class='comment-wrapper'>
        <comment :comment='food.comment' v-if='food.comment'></comment>
        <p class='none' v-else>暂无相关介绍</p>
      </div>
    </div>
  </div>
  <div class='cartcar-wrapper'>
    <cartcar :goods='goods' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></cartcar>
  </div>
  <back></back>
</div>
</template>
<script>
import comment from 'components/comment/comment'
import cartcar from 'components/cartcar/cartcar'
import back from 'components/btn/back'
import collect from 'components/btn/collect'
import addbtn from 'components/btn/addbtn'
import Vue from 'vue'
import axios from 'axios'
// const SELLER = '/api/seller' 测试环境下
// const ERR_OK = 0
const SELLER = 'http://101.200.48.175/data.php'
const ERR_OK = 'OK'
export default {
  data () {
    return {
      food: {},
      seller: {},
      goods: [],
      good: {}
    }
  },
  components: {
    comment,
    cartcar,
    back,
    collect,
    addbtn
  },
  created () {
    axios.get(SELLER).then((res) => {
      // 测试环境下
      // if (res.data.errno === ERR_OK) {
      //   this.seller = res.data.data
      // }
      // 开发环境下
      axios.get(SELLER).then((res) => {
        if (res.statusText === ERR_OK) {
          this.seller = res.data
        }
      })
    })
    if (localStorage.getItem('goods')) {
      this.goods = JSON.parse(localStorage.getItem('goods'))
      const goodName = decodeURI(this.$route.params.goodName)
      const foodName = decodeURI(this.$route.params.foodName)
      this.good = this.goods.filter(good => good.name === goodName)[0]
      this.food = this.good.products.filter(food => food.name === foodName)[0]
    } else {
      this.$router.push({name: 'goods'})
    }
  },
  methods: {
    addGood () {
      if (this.good.count === undefined) {
        Vue.set(this.good, 'count', 0)
      }
      this.good.count++
      this.setItem()
    },
    setItem () {
      localStorage.setItem('goods', JSON.stringify(this.goods))
    }
  }
}
</script>
<style lang='stylus' scoped>
::-webkit-scrollbar
  width:0px
.detail-food
  position:absolute
  top:0
  left:0
  right:0
  bottom:48px
  z-index:50
  background-color:#f3f5f7
  overflow-y:auto
  .img
    position:relative
  .wrap
    margin-bottom:16px
    padding:18px
    background:#fff
    .title
      margin-bottom:8px
      font-size:1.4rem
      color:rgb(7,17,27)
    &.detail
      display:flex
      align-items:flex-end
      .left
        flex:1
        .title
          font-weight:700
        .extra
          font-size:0
          span
            font-size:1rem
            padding-right:12px
            margin-bottom:18px
            color:rgb(148,153,159)
        .price
          display:flex
          align-items:center
          font-size:0
          .nowPrice
            margin-right:10px
            line-height:2rem
            font-size:1.6rem
            font-weight:700
            color:rgb(240,20,20)
          .oldPrice
            font-size:1rem
            font-weight:700
            vertical-align:middle
            text-decoration:line-through
      .right
        flex:0 0 80px
    &.board
      .info
        padding:0 8px
        font-size:1.2rem
        line-height:24px
        color:rgb(77,85,93)
    &.comment
      .comment-wrapper
        margin-top:12px
        .none
          padding:0 8px
          font-size:1.2rem
          line-height:2rem
          color:rgb(77,85,93)
.cartcar-wrapper
  position:absolute
  width:100%
  bottom:0
  z-index:100
</style>