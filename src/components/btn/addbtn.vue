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
			if (!this.food.ccount) {
				Vue.set(this.food, 'ccount', 0)
			}
			this.food.ccount ++
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