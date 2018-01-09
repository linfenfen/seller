<template>
<div>
  <div class='detail-food' v-show='food.name'>
    <div class='fooddetail'>
      <div class='img'>
        <img :src='food.image' width='100%' height='275' />
        <collect :food='food' @setItem='setItem'></collect>
      </div>
      <div class='wrap detail'>
        <div class='left'>
          <h2 class='title'>{{food.name}}</h2>
          <div class='extra'>
            <span>月售 {{food.sellCount}} 份</span>
            <span>好评率 {{food.rating}}%</span>
          </div>
          <div class='price'>
            <span class='nowPrice'>￥{{food.price}}</span>
            <span class='oldPrice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
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
    <div class='wrap commit'>
      <h2 class='titles'>商品评价</h2>
      <div class='commit-wrapper'>
        <commit :ratings='food.ratings'></commit>
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
import commit from 'components/commit/commit'
import cartcar from 'components/cartcar/cartcar'
import back from 'components/btn/back'
import collect from 'components/btn/collect'
import addbtn from 'components/btn/addbtn'
import Vue from 'vue'
import axios from 'axios'
const SELLER = '/api/seller'
const GOODS = '/api/goods'
const ERR_OK = 0
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
    commit,
    cartcar,
    back,
    collect,
    addbtn
  },
  created () {
    axios.get(SELLER).then((res) => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data
      }
    })
    if (localStorage.getItem('goods')) {
      this.goods = JSON.parse(localStorage.getItem('goods'))
      const goodName = decodeURI(this.$route.params.goodName)
      const foodName = decodeURI(this.$route.params.foodName)
      this.good = this.goods.filter(good => good.name === goodName)[0]
      this.food = this.good.foods.filter(food => food.name === foodName)[0]
    } else {
      axios.get(GOODS).then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data
          const goodName = decodeURI(this.$route.params.goodName)
          const foodName = decodeURI(this.$route.params.foodName)
          this.good = this.goods.filter(good => good.name === goodName)[0]
          this.food = this.good.foods.filter(food => food.name === foodName)[0]
        }
      })
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
.detail-food
  position:fixed
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
        font-size:12px
        line-height:24px
        color:rgb(77,85,93)
    &.commit
      .commit-wrapper
        margin-top:12px
.cartcar-wrapper
  position:absolute
  width:100%
  bottom:0
  z-index:100
</style>