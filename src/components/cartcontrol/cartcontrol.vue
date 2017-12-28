<template>
	<div class='cartcontrol'>
    <span v-show='food.count>0' class='icon-remove_circle_outline' @click='decreaseFood(food)'></span>
    <span v-show='food.count>0' class='count'>{{food.count}}</span>
    <span class='icon-add_circle' @click='addFood(food)'></span>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addFood (food) {
      if (!food.count) {
        // 对于观测对象来说，本身不存在的属性，需要通过vue.set赋值，否则属性不生效，defineProperty检测不到
        Vue.set(food, 'count', 0)
      }
      food.count++
    },
    decreaseFood (food) {
      food.count--
    }
  }
}
</script>
<style lang='stylus'>
.cartcontrol
  .icon-remove_circle_outline
    color:blue
    line-height:24px
    vertical-align:middle
  .count
    display:inline-block
    width:24px
    line-height:24px
    font-size:10px
    text-align:center
    color:rgb(147,153,159)
  .icon-add_circle
    color:blue
    line-height:24px
    vertical-align:middle
</style>