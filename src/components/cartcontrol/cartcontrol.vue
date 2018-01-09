<template>
	<div class='cartcontrol'>
    <!-- 该处不能用动画 否则会快速点击时会造成错误 -->
    <!-- <transition name='showcontrol'> -->
      <span v-show='food.count>0' class='icon-remove_circle_outline' @click='decreaseFood'></span>
    <!-- </transition> -->
    <transition name='showcontrol'>
      <span v-show='food.count>0' class='count'>{{food.count}}</span>
    </transition>
    <span class='icon-add_circle' @click='addFood'></span>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    },
    good: {
      type: Object
    }
  },
  methods: {
    addFood () {
      if (this.good.count === undefined) {
        // 对于观测对象来说，本身不存在的属性，需要通过vue.set赋值，否则属性不生效，defineProperty检测不到
        Vue.set(this.good, 'count', 0)
      }
      if (this.food.count === undefined) {
        Vue.set(this.food, 'count', 0)
      }
      this.food.count++
      this.good.count++
    },
    decreaseFood () {
      this.food.count--
      this.good.count--
    }
  }
}
</script>
<style lang='stylus'>
.cartcontrol
  display:flex
  align-items:center
  .showcontrol-enter-active,.showcontrol-leave-active
    transition:all 0.2s
  .showcontrol-enter,.showcontrol-leave-to
    transform:translateX(10px)
    opacity:0
  .icon-remove_circle_outline
    font-size:2rem
    color:#00a0dc
  .count
    width:2.2rem
    font-size:1rem
    text-align:center
    color:rgb(147,153,159)
  .icon-add_circle
    font-size:2rem
    color:#00a0dc
</style>