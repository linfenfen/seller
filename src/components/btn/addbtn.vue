<template>
	<div class='addcart' @click='addFood'>
		加入购物车
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
		addFood () {
			if (!this.food.count) {
				Vue.set(this.food, 'count', 0)
			}
			this.food.count ++
			this.$emit('addbtn')
		}
	}
}
</script>
<style scoped lang='stylus'>
.addcart
	width:80px
	text-align: center
	font-size:1.2rem
	line-height:2rem
	border-radius: 1rem
	color:#fff
	background-color: rgb(0,180,220)
</style>